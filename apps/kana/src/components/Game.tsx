import {
  For,
  Match,
  Show,
  Switch,
  batch,
  createEffect,
  createSignal,
  onCleanup,
  onMount,
} from "solid-js";
import { createStore } from "solid-js/store";
import { css } from "styled-system/css";
import { X } from "lucide-solid";

import { kanaGroups } from "~/lib/kana";
import { useSelected } from "~/lib/selected";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { Progress } from "~/components/ui/Progress";
import { useSettings } from "~/lib/settings";

// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const LIVES = 2;

export function Game(props) {
  const { selected } = useSelected();
  const { mode } = useSettings();

  const kana = Object.entries(kanaGroups)
    .flatMap(([title, group]) =>
      group.flatMap((row, i) => (selected[title][i] ? row : []))
    )
    .filter((info) => info != null);

  shuffleArray(kana);

  const [index, setIndex] = createSignal(0);
  const [misses, setMisses] = createStore(Array(kana.length).fill(0));

  let textfield;
  let timerInterval;

  const [seconds, setSeconds] = createSignal(0);

  onMount(() => {
    textfield && textfield.focus();

    timerInterval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
  });

  onCleanup(() => clearInterval(timerInterval));

  createEffect(() => {
    if (index() == kana.length) {
      clearInterval(timerInterval);
    }
  });

  const reset = () => {
    batch(() => {
      setMisses(Array(kana.length).fill(0));
      setIndex(0);
      setSeconds(0);

      shuffleArray(kana);

      timerInterval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    });
    textfield.focus();
  };

  return (
    <main
      class={css({
        overflowX: "hidden",
        height: "100%",
        p: 4,
      })}
    >
      <div
        class={css({
          maxWidth: "breakpoint-md",
          mx: "auto",
          height: "100%",
          display: "flex",
          flexDir: "column",
        })}
      >
        <div
          class={css({
            display: "flex",
            alignItems: "center",
            gap: 4,
          })}
        >
          <Button onClick={props.onEnd} size="sm" variant="outline">
            Quit
          </Button>
          <Progress value={index()} min={0} max={kana.length} />
          <div
            class={css({
              whiteSpace: "pre",
              fontFamily: "monospace",
              fontSize: "lg",
            })}
          >
            {`${Math.floor(seconds() / 60)
              .toString()
              .padStart(2, "0")}:${Math.floor(seconds() % 60)
              .toString()
              .padStart(2, "0")}`}
          </div>
        </div>
        <Show
          when={index() < kana.length}
          fallback={
            <>
              <Results kana={kana} misses={misses} />
              <div
                class={css({
                  display: "flex",
                  gap: 2,
                  mt: "auto",
                })}
              >
                <Button width="100%" onClick={props.onEnd}>
                  Back
                </Button>
                <Button width="100%" variant="outline" onClick={reset}>
                  Try Again
                </Button>
              </div>
            </>
          }
        >
          <div
            class={css({
              display: "flex",
              justifyContent: "center",
              visibility: misses[index()] ? null : "hidden",
            })}
          >
            <For each={Array.from({ length: LIVES }, (_, i) => i + 1)}>
              {(numMisses) => (
                <X
                  size={32}
                  stroke-width={4}
                  class={css({
                    color:
                      misses[index()] >= numMisses ? "red.9" : "fg.disabled",
                    animation:
                      misses[index()] >= numMisses ? "fallIn 300ms" : null,
                  })}
                />
              )}
            </For>
          </div>
          <div
            class={css({
              position: "relative",
            })}
          >
            <Show when={(index() & 1) == 0}>
              <KanaCarousel index={index()} kana={kana} />
            </Show>
            <Show when={(index() & 1) == 1}>
              <KanaCarousel index={index()} kana={kana} />
            </Show>
          </div>
          <Input
            type="text"
            size="2xl"
            class={css({
              fontWeight: "bold",
              textAlign: "center",
              width: "100%",
              display: "block",
              mx: "auto",
              sm: {
                width: 48,
              },
              _placeholder: {
                color: "fg.disabled",
              },
            })}
            maxLength={3}
            autofocus
            autocapitalize="none"
            ref={textfield}
            onKeyPress={(e) => {
              if (!(e.key === "Enter" || e.key === " ")) return;
              e.preventDefault();

              if (kana[index()].romaji.includes(e.currentTarget.value)) {
                textfield.placeholder = "";
                setIndex((i) => i + 1);
              } else {
                setMisses(index(), (attempt) => {
                  if (attempt == LIVES) return attempt;
                  return attempt + 1;
                });

                const currIndex = index();
                if (misses[currIndex] == LIVES) {
                  setTimeout(() => {
                    textfield.placeholder = "";
                    setIndex(currIndex + 1);
                  }, 300);
                }

                textfield.style.animation = null;
                textfield.offsetHeight;
                textfield.style.animation = "errorWobble 300ms";
                textfield.placeholder = e.currentTarget.value;
              }

              e.currentTarget.value = "";
            }}
          />
        </Show>
      </div>
    </main>
  );
}

function KanaCarousel(props) {
  const { mode } = useSettings();
  return (
    <>
      <Show when={props.index}>
        <div
          class={css({
            position: "absolute",
            animation: "slideLeft 500ms forwards",
            width: "100%",
            fontSize: "9xl",
            fontWeight: "black",
            textAlign: "center",
            lineHeight: 1,
            mb: 8,
          })}
        >
          {props.kana[props.index - 1][mode()]}
        </div>
      </Show>
      <div
        class={css({
          animation: "slideFromRight 500ms",
          width: "100%",
          fontSize: "9xl",
          fontWeight: "black",
          textAlign: "center",
          lineHeight: 1,
          mb: 8,
        })}
      >
        {props.kana[props.index][mode()]}
      </div>
    </>
  );
}

function Results(props) {
  const perfect = props.kana.filter((_, j) => props.misses[j] === 0);
  const mistakes = props.kana.filter(
    (_, j) => props.misses[j] > 0 && props.misses[j] < LIVES
  );
  const skipped = props.kana.filter((_, j) => props.misses[j] === LIVES);

  const score = (perfect.length + mistakes.length / 2) / props.kana.length;

  return (
    <>
      <div
        class={css({
          fontSize: "2xl",
          fontWeight: "bold",
          textAlign: "center",
        })}
      >
        Results
      </div>
      <div
        class={css({
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
          mb: 4,
        })}
      >
        <div
          class={css({
            fontSize: "7xl",
            fontWeight: "bold",
            lineHeight: 1,
          })}
        >
          {(score * 100).toFixed(0)}%
        </div>
        <div
          class={css({
            fontSize: "2xl",
            fontFamily: "monospace",
            whiteSpace: "pre",
          })}
        >
          <div>{perfect.length.toString().padStart(2, " ")} perfect</div>
          <div>
            {mistakes.length.toString().padStart(2, " ")} inaccurac
            {mistakes.length === 1 ? "y" : "ies"}
          </div>
          <div>{skipped.length.toString().padStart(2, " ")} skipped</div>
        </div>
      </div>

      <div
        class={css({
          fontSize: "lg",
          fontWeight: "medium",
          textAlign: "center",
        })}
      >
        <Show when={perfect.length === props.kana.length}>
          <div>Nothing to review</div>
        </Show>
        <Show when={skipped.length}>
          <div>Skipped</div>
          <MissedKana infos={skipped} />
        </Show>
        <Show when={mistakes.length}>
          <div>Inaccuracies</div>
          <MissedKana infos={mistakes} />
        </Show>
      </div>
    </>
  );
}

function MissedKana(props) {
  const { mode } = useSettings();
  return (
    <div
      class={css({
        gridColumn: 2,
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 2,
        my: 2,
      })}
    >
      <For each={props.infos}>
        {(info) => (
          <Button
            variant="outline"
            class={css({
              px: 0,
              fontSize: "md",
              height: "unset",
              userSelect: "text",
            })}
          >
            <div class={css({ p: 2, width: "100%" })}>
              {info[mode()]}
              <div class={css({ fontSize: "sm" })}>{info.romaji[0]}</div>
            </div>
          </Button>
        )}
      </For>
    </div>
  );
}
