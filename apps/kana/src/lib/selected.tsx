import { createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { comboKana, dakuonKana, gojuonKana } from "~/lib/kana";

import type { SetStoreFunction, Store } from "solid-js/store";

type Selection = {
  Gojūon: boolean[];
  Dakuon: boolean[];
  Combo: boolean[];
};

const SelectedContext = createContext<{
  selected: Store<Selection>;
  setSelected: SetStoreFunction<Selection>;
}>();

export function SelectedProvider(props) {
  const [selected, setSelected] = createStore({
    Gojūon: gojuonKana.map(() => false),
    Dakuon: dakuonKana.map(() => false),
    Combo: comboKana.map(() => false),
  });
  return (
    <SelectedContext.Provider
      value={{
        selected,
        setSelected,
      }}
    >
      {props.children}
    </SelectedContext.Provider>
  );
}

export function useSelected() {
  return useContext(SelectedContext);
}
