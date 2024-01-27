import {
  For,
  Show,
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

// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export function Game(props) {
  const { mode, selected } = useSelected();

  const kana = Object.entries(kanaGroups)
    .flatMap(([title, group]) =>
      group.flatMap((row, i) => (selected[title][i] ? row : []))
    )
    .filter((info) => info != null);

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

  return (
    <main
      class={css({
        position: "relative",
        overflowX: "hidden",
        p: 4,
        maxWidth: "breakpoint-md",
        mx: "auto",
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
        <Progress
          value={index()}
          min={0}
          max={kana.length}
          class={css({ mt: 2, mb: 2 })}
        />
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
            <Show
              when={misses.reduce((acc, miss) => miss + acc, 0)}
              fallback={<div>Nice</div>}
            >
              <For each={["Skipped", "Mistakes"]}>
                {(title, i) => {
                  const infos =
                    i() == 0
                      ? kana.filter((_, j) => misses[j] >= 3)
                      : kana.filter((_, j) => misses[j] >= 1 && misses[j] < 3);
                  return (
                    <Show when={infos.length}>
                      <div
                        class={css({
                          fontSize: "2xl",
                          fontWeight: "bold",
                          textAlign: "center",
                        })}
                      >
                        {title}
                      </div>
                      <div
                        class={css({
                          display: "flex",
                          justifyContent: "center",
                          flexWrap: "wrap",
                          gap: 2,
                          my: 2,
                        })}
                      >
                        <For each={infos}>
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
                                <div class={css({ fontSize: "sm" })}>
                                  {info.romaji[0]}
                                </div>
                              </div>
                            </Button>
                          )}
                        </For>
                      </div>
                    </Show>
                  );
                }}
              </For>
            </Show>
            <div class={css({ display: "flex", gap: 2 })}>
              <Button width="100%" onClick={props.onEnd}>
                Back
              </Button>
              <Button
                width="100%"
                variant="outline"
                onClick={() => {
                  batch(() => {
                    setMisses(Array(kana.length).fill(0));
                    setIndex(0);
                    setSeconds(0);

                    timerInterval = setInterval(() => {
                      setSeconds((s) => s + 1);
                    }, 1000);
                  });
                  textfield.focus();
                }}
              >
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
          <For each={[1, 2, 3]}>
            {(numMisses) => (
              <X
                size={32}
                stroke-width={4}
                class={css({
                  color: misses[index()] >= numMisses ? "red.9" : "fg.disabled",
                  animation:
                    misses[index()] >= numMisses ? "fallIn 300ms" : null,
                })}
              />
            )}
          </For>
        </div>
        <Show when={(index() & 1) == 0}>
          <KanaCarousel index={index()} mode={mode()} kana={kana} />
        </Show>
        <Show when={(index() & 1) == 1}>
          <KanaCarousel index={index()} mode={mode()} kana={kana} />
        </Show>
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
                if (attempt == 3) return attempt;
                return attempt + 1;
              });

              const currIndex = index();
              if (misses[currIndex] == 3) {
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
    </main>
  );
}

function KanaCarousel(props) {
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
          {props.kana[props.index - 1][props.mode]}
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
        {props.kana[props.index][props.mode]}
      </div>
    </>
  );
}
