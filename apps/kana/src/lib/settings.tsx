import {
  Accessor,
  Setter,
  createContext,
  createSignal,
  useContext,
} from "solid-js";

type Mode = "hira" | "kata";

const SettingsContext = createContext<{
  sound: Accessor<boolean>;
  setSound: Setter<boolean>;
  write: Accessor<boolean>;
  setWrite: Setter<boolean>;
  mode: Accessor<Mode>;
  setMode: Setter<Mode>;
}>();

export function SettingsProvider(props) {
  const [mode, setMode] = createSignal<Mode>("hira");
  const [sound, setSound] = createSignal(true);
  const [write, setWrite] = createSignal(false);

  return (
    <SettingsContext.Provider
      value={{
        mode,
        setMode,
        sound,
        setSound,
        write,
        setWrite,
      }}
    >
      {props.children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
