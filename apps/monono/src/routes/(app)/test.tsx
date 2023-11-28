import {
  For,
  Show,
  createMemo,
  createSignal,
  onMount,
  splitProps,
} from "solid-js";
import { createStore } from "solid-js/store";
import { useLocation, useNavigate, useSearchParams } from "solid-start";
import { Accordion } from "~/components/ui/Accordion";
import { FlatButton } from "~/components/ui/FlatButton";
import { ThickButton } from "~/components/ui/ThickButton";
import { ToggleButton } from "~/components/ui/ToggleButton";
import { dakuonKana, gojuonKana, yoonKana } from "~/data/kana";

const kanaCharts = [gojuonKana, dakuonKana, yoonKana];
const chartTitles = ["Gojūon", "Dakuon", "Yōon"];
const toChartIndex = kanaCharts.map(
  (chart) => new Map(chart.map((row, i) => [row[0].romaji[0], i]))
);

export default function Test() {
  const location = useLocation();
  const _navigate = useNavigate();

  const [params, _] = useSearchParams();

  // setParams uses URLSearchParams which doesn't support bare params like "?kata" or unencoded chars like "," and ";"
  const manualSetParams = (pathname, mode, sel) => {
    const modeParam = mode === "kata" ? mode : "";
    const selParam = sel.length ? `sel=${sel}` : "";

    _navigate(
      `${pathname}${(modeParam || selParam) && "?"}${modeParam}${
        modeParam && selParam && "&"
      }${selParam}`,
      {
        scroll: false, // scroll to top
        resolve: false, // resolve relative to current
        replace: true, // replace in history
      }
    );
  };

  const [started, setStarted] = createSignal(false);

  const mode = () => (params.kata === undefined ? "hira" : "kata");

  // FUTURE: This is accessed way too much and I don't know why
  // the <For> in <Accordian> calls it twice between renders for each item
  // Memo is good enough but I still don't understand underlying cause
  const selections = createMemo(() => {
    const lists = (params.sel ?? "").split(";");

    const chartSels = kanaCharts.map((chart) =>
      Array(chart.length).fill(false)
    );

    for (let i = 0; i < 3 && i < lists.length; i++) {
      const list = lists[i];
      list.split(",").forEach((char) => {
        if (char === "all") {
          chartSels[i].fill(true);
          return;
        }

        if (!toChartIndex[i].has(char)) return;
        chartSels[i][toChartIndex[i].get(char)] = true;
      });
    }

    return chartSels;
  });

  const setSelections = (i) => (ithSel) => {
    const chartSels = selections();
    chartSels[i] = ithSel;

    const lists = [[], [], []];

    chartSels.forEach((chart, j) => {
      if (chart.every((selected) => selected)) {
        lists[j].push("all");
        return;
      }
      chart.forEach((selected, k) => {
        if (!selected) return;
        lists[j].push(kanaCharts[j][k][0].romaji[0]);
      });
    });

    const sel = lists
      .map((list) => list.join(","))
      .join(";")
      .replace(/;+$/, "");

    manualSetParams(location.pathname, mode(), sel);
  };

  // b/c list is shuffled, memo or remove reactivity needed
  const studyList = createMemo(() => {
    const list = [];

    selections().forEach((selection, i) => {
      selection.forEach((selected, j) => {
        if (!selected) return;
        list.push(
          ...kanaCharts[i][j].map((entry) => ({
            prompt: entry[mode()],
            romaji: entry.romaji,
          }))
        );
      });
    });

    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }

    return list;
  });

  const firstSelected = selections().findIndex((selection) =>
    selection.some((selected) => selected)
  );
  const defaultIndex = firstSelected !== -1 ? firstSelected : 0;

  return (
    <main class="h-full">
      <Show
        when={started()}
        fallback={
          <>
            <div class="max-w-sm py-8 mx-auto h-full flex flex-col gap-6">
              <ToggleButton
                toggles={[
                  { text: "Hiragana", value: "hira" },
                  { text: "Katakana", value: "kata" },
                ]}
                defaultValue="hira" // acts as fallback if searchParams invalid
                value={mode()}
                onChange={(mode) => {
                  const index = location.search.indexOf("sel=");
                  const sel =
                    index !== -1 ? location.search.slice(index + 4) : "";
                  manualSetParams(location.pathname, mode, sel);
                }}
              />
              <Accordion
                class="text-lg"
                defaultValue={[`item-${defaultIndex}`]}
                collapsible
                items={selections().map((selection, i) => ({
                  title: () => (
                    <Title
                      title={chartTitles[i]}
                      chart={kanaCharts[i]}
                      selections={selection}
                      mode={mode()}
                    />
                  ),
                  content: () => (
                    <Content
                      chart={kanaCharts[i]}
                      selections={selection}
                      setSelections={setSelections(i)}
                      mode={mode()}
                    />
                  ),
                }))}
              />
              <FlatButton
                class="mt-auto p-3 text-lg font-bold disabled:(bg-muted text-muted-foreground border-transparent)"
                disabled={selections().every((sel) => sel.every((r) => !r))}
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
      <div class="inline-grid grid-rows-2 grid-flow-col gap-1 mr-1 h-full my-auto [direction:rtl]">
        <For each={props.chart}>
          {(_, i) => (
            <div
              class="w-[8px] h-[8px] border rounded-[2px] border-foreground"
              classList={{
                "bg-white": props.selections[i()],
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
        active={props.selections.every((row) => row)}
        onClick={() => {
          const allActive = props.selections.every((row) => row);
          props.setSelections(Array(props.selections.length).fill(!allActive));
        }}
      >
        Select all
      </CheckboxButton>
      <For each={props.chart}>
        {(row, i) => (
          <CheckboxButton
            active={props.selections[i()]}
            onClick={() => {
              props.setSelections(
                props.selections.map((sel, j) => (i() === j ? !sel : sel))
              );
            }}
          >
            {`${row[0][props.mode]} ${row[0].romaji[0]}`}
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
  active: boolean;
  value: string;
  isPlaceholder: boolean;
  focus: () => void;
  focused: boolean;
};

function Question(props: QuestionProps) {
  return (
    <li class="w-[8rem]">
      <div class="[font-size:8rem]">{props.prompt}</div>
      <div
        class="w-[8rem] px-2 py-1 rounded cursor-text"
        classList={{
          "bg-foreground/5": props.active,
        }}
        onClick={props.focus}
      >
        <div
          class="w-fit text-4xl h-10 font-bold m-auto relative select-none"
          classList={{
            "text-muted-foreground": props.isPlaceholder,
            "after:(absolute content-[''] w-0.5 h-full bg-foreground animate-blink)":
              props.active && props.focused,

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

  const [focused, setFocused] = createSignal(false);

  onMount(() => {
    textfield && textfield.focus();
  });

  const [missedKana, setMissedKana] = createStore([]);
  const onMiss = (entry) => {
    setMissedKana(missedKana.length, entry);
  };

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
            <div>You missed:</div>
            <For each={missedKana}>
              {(entry) => {
                return (
                  <div>
                    {entry.prompt}
                    <span>{entry.romaji[0]}</span>
                  </div>
                );
              }}
            </For>
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
            } else {
              onMiss(props.studyList[index()]);
            }

            setValue("");
          }}
          onFocus={[setFocused, true]}
          onBlur={[setFocused, false]}
        />
        <ul
          ref={ulist}
          style={{ "margin-left": "calc(50vw - 4rem)" }}
          class="overflow-hidden flex gap-[8rem] [transition:margin-left_300ms_ease-in-out]"
        >
          <For each={props.studyList}>
            {(item, i) => (
              <Question
                focus={() => textfield.focus()}
                focused={focused()}
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
