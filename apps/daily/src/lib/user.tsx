import { createContext, onMount, useContext } from "solid-js";
import { createStore, type Store } from "solid-js/store";

enum Status {
  "SKIPPED" = 0,
  "VISITED" = 1,
  "COMPLETED" = 2,
}

type Days = {
  [key: string]: {
    status: Status;
    timestamp: string;
  };
};

function getDateKey(date: Date) {
  return `${date.getFullYear}-${date.getMonth() + 1}-${date.getDate()}`;
}

export function getStreak(days: Days) {
  const curr = new Date();

  let day = days[getDateKey(curr)];
  let streak = 0;
  while (day && day.status >= Status.VISITED) {
    streak++;

    curr.setDate(curr.getDate() - 1);
    day = days[getDateKey(curr)];
  }
  return streak;
}

const UserContext = createContext<{
  days: Store<Days>;
  updateToday: (status: Status) => void;
}>();

export function UserProvider(props) {
  const [days, setDays] = createStore<Days>({});

  onMount(() => {
    const daysJson = localStorage.getItem("days");
    if (daysJson != null) {
      setDays(JSON.parse(daysJson));
    }
    updateToday(Status.VISITED);
  });

  const updateToday = (status: Status) => {
    const today = new Date();
    const key = getDateKey(today);

    if (days[key] && days[key].status >= status) return;

    setDays(key, { status, timestamp: today.toISOString() });
    localStorage.setItem("days", JSON.stringify(days));
  };

  return (
    <UserContext.Provider value={{ days, updateToday }}>
      {props.children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
