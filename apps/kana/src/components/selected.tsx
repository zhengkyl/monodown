import { createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { comboKana, dakuonKana, gojuonKana } from "~/lib/kana";

import type { SetStoreFunction, Store } from "solid-js/store";

type Value = {
  Gojūon: boolean[];
  Dakuon: boolean[];
  Combo: boolean[];
};

const SelectedContext =
  createContext<[Store<Value>, SetStoreFunction<Value>]>();

export function SelectedProvider(props) {
  const value = createStore({
    Gojūon: gojuonKana.map(() => false),
    Dakuon: dakuonKana.map(() => false),
    Combo: comboKana.map(() => false),
  });
  return (
    <SelectedContext.Provider value={value}>
      {props.children}
    </SelectedContext.Provider>
  );
}

export function useSelected() {
  return useContext(SelectedContext);
}
