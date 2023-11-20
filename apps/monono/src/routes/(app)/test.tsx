import { TextField } from "@kobalte/core";
import { TextFieldRootProps } from "@kobalte/core/dist/types/text-field";
import { For, Show, createSignal, onMount, splitProps } from "solid-js";
import { SetStoreFunction, createStore } from "solid-js/store";
import { Button } from "~/components/ui/Button";
import { mainKana, dakutenKana, comboKana, KanaInfo } from "~/data/kana";

export default function Test() {
  const [mode, setMode] = createSignal<"hira" | "kata">("hira");

  const [started, setStarted] = createSignal(true);

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
    <main class="flex flex-col justify-center h-50svh w-100vw">
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
export interface TextlineProps extends TextFieldRootProps {
  ref?: HTMLInputElement;
  placeholder?: string;
}
function Textline(props: TextlineProps) {
  const [, rest] = splitProps(props, ["ref"]);
  return (
    <TextField.Root {...rest}>
      <TextField.Input
        ref={props.ref}
        placeholder={props.placeholder}
        // autocapitalize="none"
        // autocomplete="off"
        class="disabled:bg-transparent w-full px-2 py-1 rounded text-4xl font-bold text-center bg-foreground/5 focus-visible:outline-none placeholder:text-muted-foreground"
      />
    </TextField.Root>
  );
}

type QuestionProps = {
  prompt: string;
  // answers: string[];
  active: boolean;
  // onFinish: (pass) => void;
  value: string;
  placeholder: string;
};

function Question(props: QuestionProps) {
  return (
    <li class="w-[8rem]">
      <div class="[font-size:8rem]">{props.prompt}</div>
      <Textline
        class="w-[8rem]"
        disabled
        value={props.value}
        placeholder={props.placeholder}
      />
    </li>
  );
}

type KanaQuizProps = {
  studyList: { prompt: string; romaji: string[] }[];
  onFinish: () => void;
};

function KanaQuiz(props: KanaQuizProps) {
  const [index, setIndex] = createSignal(0);

  const [value, setValue] = createSignal("");
  const [answers, setAnswers] = createStore(Array(props.studyList.length));

  let ulist: HTMLUListElement;

  const next = () => {
    setIndex((i) => i + 1);
    // 4 (center) + 16 (gap + width)
    ulist.style.marginLeft = `calc(50vw - ${4 + index() * 16}rem)`;
  };

  let textfield: HTMLInputElement;

  onMount(() => {
    textfield && textfield.focus();
    console.log("onMount");
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
      <input
        type="text"
        class="w-0 h-0 outline-none"
        autofocus
        autocapitalize="none"
        onBlur={() => setTimeout(() => textfield.focus(), 20)}
        ref={textfield}
        value={value()}
        onInput={(e) => {
          setValue(e.target.value);
          setAnswers(index(), e.target.value);
        }}
        onKeyPress={(e) => {
          if (!(e.key === "Enter" || e.key === " ")) return;
          e.preventDefault();

          if (props.studyList[index()].romaji.includes(value())) {
            next();
          }
          setValue("");
        }}
      />
      <ul
        ref={ulist}
        style={{ "margin-left": "calc(50vw - 4rem)" }}
        class="overflow-hidden flex gap-[8rem] [transition:margin-left_300ms_ease-in-out]"
      >
        <For each={props.studyList}>
          {(item, i) => (
            <Question
              prompt={item.prompt}
              value={
                i() === index() && value() !== answers[i()] ? "" : answers[i()]
              }
              placeholder={
                i() === index() && value() !== answers[i()]
                  ? answers[i()]
                  : null
              }
              active={i() === index()}
            />
          )}
        </For>
      </ul>
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
