import { For, Show, createSignal } from "solid-js";
import { SetStoreFunction, createStore } from "solid-js/store";
import { Button } from "~/components/ui/Button";
import { Textfield } from "~/components/ui/Textfield";
import { mainKana, dakutenKana, comboKana, KanaInfo } from "~/data/kana";

export default function Kana() {
  const [mode, setMode] = createSignal<"hira" | "kata">("hira");

  const [started, setStarted] = createSignal(false);

  const [mainActive, setMainActive] = createStore(
    Array(mainKana.length).fill(false)
  );
  const [dakutenActive, setDakutenActive] = createStore(
    Array(dakutenKana.length).fill(false)
  );
  const [comboActive, setComboActive] = createStore(
    Array(comboKana.length).fill(false)
  );

  function rowToItems(row: KanaInfo[]) {
    return row.map((entry) => ({
      prompt: entry[mode()],
      type: entry.romaji,
    }));
  }

  function studyList() {
    const list = [];
    mainActive.forEach((selected, i) => {
      if (!selected) return;
      list.push(...rowToItems(mainKana[i]));
    });
    dakutenActive.forEach((selected, i) => {
      if (!selected) return;
      list.push(...rowToItems(mainKana[i]));
    });
    comboActive.forEach((selected, i) => {
      if (!selected) return;
      list.push(...rowToItems(mainKana[i]));
    });
    return list;
  }

  return (
    <main>
      <Show
        when={started()}
        fallback={
          <div>
            <Button
              size="md"
              class="btn-line-indigo"
              classList={{
                "btn-line-indigo-active": mode() === "hira",
              }}
              onClick={[setMode, "hira"]}
            >
              Hiragana
            </Button>
            <Button
              size="md"
              class="btn-line-indigo"
              classList={{
                "btn-line-indigo-active": mode() === "kata",
              }}
              onClick={[setMode, "kata"]}
            >
              Katakana
            </Button>
            <Button
              onClick={[setStarted, true]}
              size="md"
              class="btn-fill-indigo"
            >
              Start
            </Button>
            <div class="flex items-start gap-4">
              <div class="grid grid-cols-2 gap-3">
                <ToggleButtons
                  title="Main Kana"
                  mode={mode()}
                  kana={mainKana}
                  active={mainActive}
                  setActive={setMainActive}
                />
              </div>
              <div class="grid grid-cols-2 gap-3">
                <ToggleButtons
                  title="Dakuten Kana"
                  mode={mode()}
                  kana={dakutenKana}
                  active={dakutenActive}
                  setActive={setDakutenActive}
                />
              </div>
              <div class="grid grid-cols-2 gap-3">
                <ToggleButtons
                  title="Combo Kana"
                  mode={mode()}
                  kana={comboKana}
                  active={comboActive}
                  setActive={setComboActive}
                />
              </div>
            </div>
          </div>
        }
      >
        <KanaQuiz studyList={studyList()} />
      </Show>
    </main>
  );
}

type KanaQuizProps = {
  studyList: { prompt: string; type: string[] }[];
};

function KanaQuiz(props: KanaQuizProps) {
  const [index, setIndex] = createSignal(0);

  const [value, setValue] = createSignal("");

  return (
    <div>
      <Show when={index() < props.studyList.length}>
        {props.studyList[index()].prompt}
        <Textfield
          value={value()}
          onChange={setValue}
          onKeyPress={(e) => {
            if (e.key !== "Enter" && e.key !== " ") return;

            e.preventDefault();
            if (props.studyList[index()].type.includes(value())) {
              setIndex(index() + 1);
              setValue("");
            }
          }}
        />
      </Show>
    </div>
  );
}

type ToggleButtonsProps = {
  title: string;
  kana: KanaInfo[][];
  mode: "hira" | "kata";
  active: boolean[];
  setActive: SetStoreFunction<boolean[]>;
};

function ToggleButtons(props: ToggleButtonsProps) {
  return (
    <>
      <Button
        size="md"
        class="btn-line-indigo col-span-2"
        classList={{
          "btn-line-indigo-active": props.active.every((value) => value),
        }}
        onClick={() => {
          const toggled = props.active.every((value) => value);
          props.setActive(Array(props.kana.length).fill(!toggled));
        }}
      >
        {props.title}
      </Button>
      <For each={props.kana}>
        {(row, i) => {
          // avoid showing "ja", "ju", "jo" twice
          const notHepburn = row[0].hira === "ぢゃ";
          return (
            <Button
              size="md"
              class="btn-line-indigo"
              classList={{ "btn-line-indigo-active": props.active[i()] }}
              onClick={() => props.setActive(i(), !props.active[i()])}
            >
              {row[0][props.mode]}/{row[0].romaji[notHepburn ? 1 : 0]}
            </Button>
          );
        }}
      </For>
    </>
  );
}
