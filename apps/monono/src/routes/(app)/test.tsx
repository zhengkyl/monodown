import { createAutoAnimateDirective } from "@formkit/auto-animate/solid";
import { TextField } from "@kobalte/core";
import { TextFieldRootProps } from "@kobalte/core/dist/types/text-field";
import {
  For,
  Show,
  createEffect,
  createSignal,
  on,
  splitProps,
} from "solid-js";
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
    <main class="">
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
}
function Textline(props: TextlineProps) {
  const [, rest] = splitProps(props, ["ref"]);
  return (
    <TextField.Root
      {...rest}
      class="bg-foreground/5 w-[clamp(1rem,_16rem,_90vw)] h-16 pt-2 pb-2 rounded relative after:(border-b-2 border-b-foreground content-[''] absolute left-0 right-0 bottom-0)"
    >
      <TextField.Input
        ref={props.ref}
        class="bg-transparent w-full text-4xl font-bold text-center focus-visible:outline-none placeholder:text-muted-foreground"
      />
    </TextField.Root>
  );
}

type QuestionProps = {
  prompt: string;
  answers: string[];
  active: boolean;
  onFinish: (pass) => void;
};

function Question(props: QuestionProps) {
  let pass = true;
  let textfield: HTMLInputElement;

  // props.active changes reference so this always reruns
  createEffect(() => {
    console.log(props.active);
    if (!props.active) return;
    textfield.disabled = false;
    textfield.focus();
  });

  return (
    <li>
      <div class="[font-size:clamp(1rem,_16rem,_90vw)]">{props.prompt}</div>
      <Textline
        disabled
        ref={textfield}
        onKeyPress={(e) => {
          if (!(e.key === "Enter" || e.key === " ")) return;
          // console.log(props.textfield, props.textfield.value);
          e.preventDefault();

          if (props.answers.includes(textfield.value)) {
            props.onFinish(pass);
            textfield.disabled = true;
          } else {
            pass = false;
            textfield.placeholder = textfield.value;
            textfield.value = "";
          }
        }}
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

  const [list, setList] = createSignal([null, null, ...props.studyList]);

  // eslint-disable-next-line
  const autoAnimate = createAutoAnimateDirective();

  createEffect(
    on(
      index,
      () => {
        setList((l) => l.slice(1));
      },
      { defer: true }
    )
  );

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
      <ul
        use:autoAnimate
        class="relative flex gap-[8rem] ml-[calc(50vw-56rem)] overflow-hidden"
      >
        <For each={list()}>
          {(item, i) =>
            i() < 2 ? (
              <div class="min-w-[16rem]"></div>
            ) : (
              <Question
                prompt={item.prompt}
                answers={item.romaji}
                active={i() === 2}
                onFinish={() => setIndex((i) => i + 1)}
              />
            )
          }
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
