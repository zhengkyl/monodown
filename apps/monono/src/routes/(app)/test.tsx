import { For, Show, createSignal, onMount, splitProps } from "solid-js";
import { createStore } from "solid-js/store";
import { Accordion } from "~/components/ui/Accordion";
import { FlatButton } from "~/components/ui/FlatButton";
import { ThickButton } from "~/components/ui/ThickButton";
import { ToggleButton } from "~/components/ui/ToggleButton";
import { KanaInfo, dakuonKana, gojuonKana, yoonKana } from "~/data/kana";

export default function Test() {
  const [mode, setMode] = createSignal<"Hiragana" | "Katakana">("Hiragana");

  const [started, setStarted] = createSignal(false);

  const [gojuonActive, setGojuonActive] = createStore(
    Array(gojuonKana.length).fill(false)
  );
  const [dakuonActive, setDakuonActive] = createStore(
    Array(dakuonKana.length).fill(false)
  );
  const [yoonActive, setYoonActive] = createStore(
    Array(yoonKana.length).fill(false)
  );

  function rowToItems(row: KanaInfo[]) {
    return row.map((entry) => ({
      prompt: entry[mode() === "Hiragana" ? "hira" : "kata"],
      romaji: entry.romaji,
    }));
  }

  function studyList() {
    const list = [];
    gojuonActive.forEach((selected, i) => {
      if (selected) list.push(...rowToItems(gojuonKana[i]));
    });
    dakuonActive.forEach((selected, i) => {
      if (selected) list.push(...rowToItems(dakuonKana[i]));
    });
    yoonActive.forEach((selected, i) => {
      if (selected) list.push(...rowToItems(yoonKana[i]));
    });
    return list;
  }

  return (
    <main class="h-full">
      <Show
        when={started()}
        fallback={
          <>
            <div class="max-w-sm py-8 mx-auto h-full flex flex-col gap-6">
              <ToggleButton
                toggles={["Hiragana", "Katakana"]}
                defaultValue="Hiragana"
                value={mode()}
                onChange={setMode}
              />
              <Accordion
                class="text-lg"
                defaultValue={["item-0"]}
                collapsible
                items={[
                  {
                    title: () => (
                      <Title
                        title="Gojūon"
                        kana={gojuonKana}
                        list={gojuonActive}
                        mode={mode()}
                      />
                    ),

                    content: () => (
                      <Content
                        kana={gojuonKana}
                        list={gojuonActive}
                        setList={setGojuonActive}
                        mode={mode()}
                      />
                    ),
                  },
                  {
                    title: () => (
                      <Title
                        title="Dakuon"
                        kana={dakuonKana}
                        list={dakuonActive}
                        mode={mode()}
                      />
                    ),
                    content: () => (
                      <Content
                        kana={dakuonKana}
                        list={dakuonActive}
                        setList={setDakuonActive}
                        mode={mode()}
                      />
                    ),
                  },
                  {
                    title: () => (
                      <Title
                        title="Yōon"
                        kana={yoonKana}
                        list={yoonActive}
                        mode={mode()}
                      />
                    ),
                    content: () => (
                      <Content
                        kana={yoonKana}
                        list={yoonActive}
                        setList={setYoonActive}
                        mode={mode()}
                      />
                    ),
                  },
                ]}
              />
              <FlatButton
                class="mt-auto p-3 text-lg font-bold disabled:(bg-muted text-muted-foreground border-transparent)"
                disabled={[
                  ...gojuonActive,
                  ...dakuonActive,
                  ...yoonActive,
                ].every((r) => !r)}
                onClick={[setStarted, true]}
              >
                Start
              </FlatButton>
            </div>
          </>
        }
      >
        <KanaQuiz studyList={studyList()} onFinish={() => setStarted(false)} />
      </Show>
    </main>
  );
}

function Title(props) {
  return (
    <>
      <span class="font-bold mr-auto">{props.title}</span>
      <div class="inline-grid grid-rows-2 grid-cols-6 grid-flow-col gap-1 mr-1">
        <For each={props.kana}>
          {(row, i) => (
            <div
              class="w-[12px] h-[12px] border rounded-[2px] border-foreground"
              classList={{
                "bg-white": props.list[i()],
              }}
            ></div>
          )}
        </For>
      </div>
      <div
        class="i-uil:angle-down h-7 w-7 ml-3 group-data-[expanded]:rotate-180 transition-[transform] duration-300"
        aria-hidden
      ></div>
    </>
  );
}

function Content(props) {
  return (
    <div class="grid grid-cols-2 gap-2">
      <CheckboxButton
        class="col-span-2"
        active={props.list.every((row) => row)}
        onClick={() => {
          const allActive = props.list.every((row) => row);
          props.setList(Array(props.kana.length).fill(!allActive));
        }}
      >
        Select all
      </CheckboxButton>
      <For each={props.kana}>
        {(row, i) => (
          <CheckboxButton
            active={props.list[i()]}
            onClick={() => props.setList(i(), !props.list[i()])}
          >
            {`${row[0][props.mode === "Hiragana" ? "hira" : "kata"]} ${
              row[0].romaji[0]
            }`}
          </CheckboxButton>
        )}
      </For>
    </div>
  );
}

function CheckboxButton(props) {
  const [, rest] = splitProps(props, ["class", "active"]);
  // TODO adding transition feels terrible b/c icon flashing?
  return (
    <FlatButton
      size="none"
      class="px-2 py-1.5 justify-start"
      classList={{
        "bg-foreground text-background": props.active,
        [props.class]: props.class,
      }}
      {...rest}
    >
      <div
        class="h-[20px] w-[20px] mr-1.5"
        classList={{
          "i-mdi:checkbox-intermediate": props.active,
          "i-mdi:checkbox-blank-outline": !props.active,
        }}
      ></div>
      <span>{props.children}</span>
    </FlatButton>
  );
}

type QuestionProps = {
  prompt: string;
  // answers: string[];
  active: boolean;
  // onFinish: (pass) => void;
  value: string;
  isPlaceholder: boolean;
};

function Question(props: QuestionProps) {
  return (
    <li class="w-[8rem]">
      <div class="[font-size:8rem]">{props.prompt}</div>
      <div
        class="w-[8rem] px-2 py-1 rounded"
        classList={{
          "bg-foreground/5": props.active,
        }}
      >
        <div
          class="w-fit text-4xl h-10 font-bold m-auto relative"
          classList={{
            "text-muted-foreground": props.isPlaceholder,
            "after:(absolute content-[''] w-0.5 h-full bg-red animate-blink)":
              props.active,

            "after:left-1/2": props.active && props.isPlaceholder,
            "after:ml-[-1px]":
              props.active && (!props.value || props.isPlaceholder),
            "after:ml-0.5":
              props.active && !(!props.value || props.isPlaceholder),
          }}
        >
          {props.value}
        </div>
      </div>
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
  });

  return (
    <div>
      <Show
        when={index() < props.studyList.length}
        fallback={
          <div class="flex gap-4">
            <ThickButton variant="fill" hue="green" onClick={props.onFinish}>
              Finish
            </ThickButton>
            <ThickButton variant="fill" hue="indigo" onClick={[setIndex, 0]}>
              Try again
            </ThickButton>
          </div>
        }
      >
        <input
          type="text"
          class="w-0 h-0 outline-none"
          maxLength={3}
          autofocus
          autocapitalize="none"
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
                value={answers[i()]}
                active={i() === index()}
                isPlaceholder={i() === index() && value() !== answers[i()]}
              />
            )}
          </For>
        </ul>
      </Show>
    </div>
  );
}
