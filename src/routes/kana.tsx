import { For, Show, createSignal, onMount } from "solid-js";
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
      romaji: entry.romaji,
    }));
  }

  function studyList() {
    const list = [];
    mainActive.forEach((selected, i) => {
      if (selected) list.push(...rowToItems(mainKana[i]));
    });
    dakutenActive.forEach((selected, i) => {
      if (selected) list.push(...rowToItems(dakutenKana[i]));
    });
    comboActive.forEach((selected, i) => {
      if (selected) list.push(...rowToItems(comboKana[i]));
    });
    return list;
  }

  return (
    <main class="max-w-screen-sm mx-auto">
      <Show
        when={started()}
        fallback={
          <>
            <Button
              size="md"
              hue={mode() === "hira" ? "indigo" : "default"}
              onClick={[setMode, "hira"]}
            >
              Hiragana
            </Button>
            <Button
              size="md"
              class="btn-line-indigo"
              hue={mode() === "kata" ? "indigo" : "default"}
              onClick={[setMode, "kata"]}
            >
              Katakana
            </Button>
            <Button
              onClick={[setStarted, true]}
              size="md"
              disabled={[...mainActive, ...dakutenActive, ...comboActive].every(
                (e) => !e
              )}
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
          </>
        }
      >
        <KanaQuiz studyList={studyList()} onFinish={() => setStarted(false)} />
      </Show>
    </main>
  );
}

type KanaQuizProps = {
  studyList: { prompt: string; romaji: string[] }[];
  onFinish: () => void;
};

function KanaQuiz(props: KanaQuizProps) {
  const [index, setIndex] = createSignal(0);

  const [value, setValue] = createSignal("");

  let textfield: HTMLInputElement;

  onMount(() => {
    textfield.focus();
  });

  return (
    <Show
      when={index() < props.studyList.length}
      fallback={
        <div class="flex gap-4">
          <Button variant="fill" hue="green" onClick={props.onFinish}>
            Finish
          </Button>
          <Button variant="fill" hue="indigo" onClick={[setIndex, 0]}>
            Try again
          </Button>
        </div>
      }
    >
      <div class="flex flex-col gap-8 items-center">
        <div class="text-9xl">{props.studyList[index()].prompt}</div>
        <Textfield
          value={value()}
          onChange={setValue}
          ref={textfield}
          class="w-24"
          onKeyPress={(e) => {
            if (e.key !== "Enter" && e.key !== " ") return;

            e.preventDefault();
            if (props.studyList[index()].romaji.includes(value())) {
              setIndex(index() + 1);
              setValue("");
            }
          }}
        />
      </div>
    </Show>
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
        class="col-span-2"
        hue={props.active.every((value) => value) ? "indigo" : "default"}
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
              hue={props.active[i()] ? "indigo" : "default"}
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
