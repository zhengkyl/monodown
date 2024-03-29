import {
  Accessor,
  Setter,
  createContext,
  createSignal,
  useContext,
} from "solid-js";
import { createStore, type SetStoreFunction, type Store } from "solid-js/store";

type Mode = "hira" | "kata";

type Diagram = {
  show: boolean;
  kana: string;
  rect: DOMRect;
};

const SettingsContext = createContext<{
  diagram: Store<Diagram>;
  setDiagram: SetStoreFunction<Diagram>;
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
  const [diagram, setDiagram] = createStore({ show: false } as Diagram);

  return (
    <SettingsContext.Provider
      value={{
        diagram,
        setDiagram,
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
