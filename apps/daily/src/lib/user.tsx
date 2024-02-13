import { createContext, onMount, useContext } from "solid-js";
import { createStore, type Store } from "solid-js/store";

export enum Status {
  "SKIPPED" = 0,
  "VISITED" = 1,
  "COMPLETED" = 2,
}

export type Days = {
  [year: number]: {
    [month: number]: {
      [day: number]: {
        status: Status;
        timestamp: string;
      };
    };
  };
};

// TODO days always accessed consecutively
// probably microscopic perf win available
// eg cache monthDays
export function getDay(days: Days, date: Date) {
  const yearDays = days[date.getFullYear()];
  if (yearDays == null) return null;

  const monthDays = yearDays[date.getMonth() + 1];
  if (monthDays == null) return null;

  const day = monthDays[date.getDate()];
  if (day == null) return null;

  return day;
}

export function getStreak(days: Days) {
  const curr = new Date();

  let day = getDay(days, curr);
  let streak = 0;
  while (day && day.status >= Status.VISITED) {
    streak++;

    curr.setDate(curr.getDate() - 1);
    day = getDay(days, curr);
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

    const day = getDay(days, today);
    if (day && day.status >= status) return;

    if (days[today.getFullYear()] == null) {
      setDays(today.getFullYear(), {});
    }
    // no need for month check b/c objects are shallow merged
    setDays(today.getFullYear(), today.getMonth() + 1, {
      [today.getDate()]: {
        status,
        timestamp: today.toISOString(),
      },
    });
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
