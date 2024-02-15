import {
  For,
  Show,
  createEffect,
  createSignal,
  onCleanup,
  untrack,
} from "solid-js";
import { Portal } from "solid-js/web";
import { Pencil, Slash, Square, Volume2, VolumeX, X } from "lucide-solid";

import { Button } from "~/components/ui/Button";
import { IconButton } from "~/components/ui/IconButton";
import { kanaGroups } from "~/lib/kana";
import { useSelected } from "~/lib/selected";
import { useSettings } from "~/lib/settings";
import { css } from "../../styled-system/css";
import { strokeAnimator } from "~/lib/strokeAnimator";
import { Slider } from "./ui/Slider";

export function Chart(props) {
  const { selecting } = useSelected();

  return (
    <main class={css({ display: "flex" })}>
      <StrokeDiagramPopover />
      <ControlOverlay onStart={props.onStart} />
      <div
        class={css({
          flex: 4,
          p: 4,
          mt: 16,
          mb: 28,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          lg: {
            flexDirection: "row",
            my: 0,
            mx: "auto",
            justifyContent: "center",
            alignItems: "start",
            maxWidth: "breakpoint-lg",
          },
        })}
      >
        <KanaCol
          title="Gojūon"
          class={css({
            display: "grid",
            gridTemplateColumns: "auto repeat(5, minmax(0, 1fr))",
            gap: 2,
            marginLeft: selecting() ? 0 : -12,
            transition: "margin 300ms",
            flexGrow: 1,
          })}
        />
        <KanaCol
          title="Dakuon"
          class={css({
            display: "grid",
            gridTemplateColumns: "auto repeat(5, minmax(0, 1fr))",
            gap: 2,
            marginLeft: selecting() ? 0 : -12,
            transition: "margin 300ms",
            flexGrow: 1,
          })}
        />
        <KanaCol
          title="Combo"
          class={css({
            display: "grid",
            gridTemplateColumns: "auto repeat(3, minmax(0, 1fr))",
            gap: 2,
            marginLeft: selecting() ? 0 : -12,
            transition: "margin 300ms",
            flexGrow: 1,
          })}
        />
      </div>
    </main>
  );
}

function ControlOverlay(props) {
  const { selecting, setSelecting, selected } = useSelected();
  const { mode, setMode, sound, setSound, write, setWrite } = useSettings();

  const anySelected = () =>
    Object.values(selected).some((groupSel) => groupSel.some((row) => row));

  return (
    <div
      class={css({
        lg: {
          top: 0,
          position: "sticky",
          height: "100svh",
          maxWidth: "96",
          flex: 1,
        },
      })}
    >
      <div
        class={css({
          px: 2,
          py: 4,
          position: "fixed",
          top: 0,
          width: "100%",
          lg: {
            position: "static",
          },
        })}
      >
        <div
          class={css({
            borderWidth: 1,
            borderColor: "gray.a8",
            borderRadius: "md",
            display: "flex",
            gap: 1,
            p: 1,
            background: "bg.default",
            boxShadow: "2xl",
          })}
        >
          <Button
            variant={mode() == "hira" ? "solid" : "ghost"}
            onClick={[setMode, "hira"]}
            class={css({ flex: 1 })}
          >
            Hiragana
          </Button>
          <Button
            variant={mode() == "kata" ? "solid" : "ghost"}
            onClick={[setMode, "kata"]}
            class={css({ flex: 1 })}
          >
            Katakana
          </Button>
          <IconButton
            variant={sound() ? "subtle" : "ghost"}
            onClick={() => setSound((s) => !s)}
            class={css({ flex: 1 })}
            title={`${sound() ? "Mute" : "Unmute"} character audio`}
          >
            {sound() ? <Volume2 /> : <VolumeX />}
          </IconButton>
          <IconButton
            variant={write() ? "subtle" : "ghost"}
            onClick={() => setWrite((w) => !w)}
            class={css({ flex: 1 })}
            title={`${write() ? "Hide" : "Show"} stroke order `}
          >
            <Pencil />
            {!write() && (
              <Slash
                class={css({
                  rotate: "90deg",
                  position: "absolute",
                })}
              />
            )}
          </IconButton>
        </div>
      </div>
      <Credits
        class={css({
          display: "none",
          p: 4,
          fontSize: "sm",
          lg: {
            display: "block",
          },
        })}
      />
      <div
        class={css({
          position: "fixed",
          bottom: 0,
          width: "100%",
          px: 2,
          py: 4,
          lg: {
            position: "absolute",
          },
          zIndex: 10,
        })}
      >
        <Show
          when={selecting()}
          fallback={
            <>
              <Button
                width="100%"
                mb={1}
                onClick={[setSelecting, true]}
                size="2xl"
                boxShadow="2xl"
              >
                Practice
              </Button>
            </>
          }
        >
          <Button
            width="100%"
            mb={1}
            colorPalette="green"
            size="2xl"
            onClick={anySelected() && props.onStart}
          >
            Start
          </Button>
          <Button
            width="100%"
            variant="outline"
            background="bg.default"
            size="sm"
            colorPalette={"red"}
            onClick={[setSelecting, false]}
          >
            Cancel
          </Button>
        </Show>
      </div>
    </div>
  );
}

function KanaCol(props) {
  const { mode, sound, write, diagram, setDiagram } = useSettings();
  const { selected, setSelected, selecting } = useSelected();
  const allSelected = () => selected[props.title].every((s) => s);

  return (
    <div class={props.class}>
      <IconButton
        variant="outline"
        onClick={() =>
          setSelected(
            props.title,
            Array(selected[props.title].length).fill(!allSelected())
          )
        }
        class={css({
          opacity: selecting() ? null : 0,
          transitionProperty:
            "background, border-color, color, box-shadow, opacity",
        })}
      >
        <Square
          stroke-width={1.5}
          classList={{
            [css({ height: 7, width: 7 })]: true,
            [css({ fill: "currentColor" })]: allSelected(),
          }}
        />
      </IconButton>
      <h2
        class={css({
          fontSize: "2xl",
          fontWeight: "bold",
          gridColumn: "2 / -1",
          alignSelf: "end",
        })}
      >
        {props.title}
      </h2>
      <For each={kanaGroups[props.title]}>
        {(row, i) => {
          const rowSelected = () => selecting() && selected[props.title][i()];
          return (
            <>
              <IconButton
                variant="outline"
                class={css({
                  height: 8,
                  width: 8,
                  minWidth: 0,
                  justifySelf: "end",
                  alignSelf: "center",
                  transitionProperty:
                    "background, border-color, color, box-shadow, opacity",
                  opacity: selecting() ? null : 0,
                })}
                onClick={() =>
                  setSelected(props.title, i(), !selected[props.title][i()])
                }
              >
                <Square
                  classList={{
                    [css({ fill: "currentColor" })]: selected[props.title][i()],
                  }}
                />
              </IconButton>
              <For each={row}>
                {(kanaInfo) => {
                  const exists = kanaInfo != null;
                  let audio;
                  return (
                    <>
                      {exists && (
                        <audio
                          ref={audio}
                          src={`/audio/${kanaInfo.romaji[0]}.ogg`}
                        />
                      )}
                      <Button
                        variant={exists && rowSelected() ? "solid" : "outline"}
                        class={css({
                          p: 2,
                          display: "block",
                          fontSize: "md",
                          height: "unset",
                          userSelect: "text",
                          _disabled: {
                            cursor: "default",
                          },
                        })}
                        disabled={!exists}
                        onClick={(e) => {
                          if (sound()) {
                            if (audio.paused) {
                              audio.play();
                            } else {
                              audio.currentTime = 0;
                            }
                          }
                          if (write()) {
                            setDiagram({
                              show: true,
                              kana: kanaInfo[mode()],
                              rect: e.currentTarget.getBoundingClientRect(),
                            });
                          }
                        }}
                      >
                        <Show when={exists}>
                          {kanaInfo[mode()]}
                          <div class={css({ fontSize: "sm" })}>
                            {kanaInfo.romaji[0]}
                          </div>
                        </Show>
                      </Button>
                    </>
                  );
                }}
              </For>
            </>
          );
        }}
      </For>
    </div>
  );
}

// This is hardcoded to match the button defined above
// I think it's better than having 100 non-delegated event listeners on the buttons themselves
function findButton(node) {
  if (node.nodeName === "BUTTON") return node;

  if (node.parentElement && node.parentElement.nodeName === "BUTTON")
    return node.parentElement;

  return null;
}
function interactOutside(el, accessor) {
  const { kana, stop, replay } = accessor();

  const onPointerDownOutside = (e) => {
    if (el.contains(e.target)) return;

    const button = findButton(e.target);
    if (button && button.childNodes[0].textContent === kana) {
      replay();
      return;
    }

    stop();
  };

  function onEscape(e: KeyboardEvent) {
    if (e.key === "Escape") stop();
  }

  document.body.addEventListener("pointerdown", onPointerDownOutside);
  document.body.addEventListener("keydown", onEscape);

  onCleanup(() => {
    document.body.removeEventListener("pointerdown", onPointerDownOutside);
    document.body.removeEventListener("keydown", onEscape);
  });
}

function StrokeDiagramPopover() {
  const { mode, diagram, setDiagram } = useSettings();

  createEffect(() => {
    if (!diagram.show) return;

    loadStrokeDiagram(untrack(mode), diagram.kana);

    onCleanup(() => {
      if (controller != null) controller.abort;
    });
  });

  let svgParent: HTMLDivElement;
  let controller;
  let animator;

  async function getSvg(mode, char) {
    controller = new AbortController();
    const resp = await fetch(`/${mode}/${char}.svg`);
    if (!resp.ok) return;
    controller = null;

    const text = await resp.text();
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(text, "text/html");
    return doc.querySelector("svg");
  }

  async function loadStrokeDiagram(mode, kana) {
    if (animator) {
      animator.stop();
      setProgress(0);
      setMarkings([]);
      svgParent.replaceChildren();
    }

    const svg = await getSvg(mode, kana[0]);

    if (kana.length == 2) {
      svg.setAttribute("viewBox", "0 0 1824 1024");

      const next = await getSvg(mode, kana[1]);

      const defs = svg.querySelector("defs");
      const nextClipPaths = next.querySelectorAll("clipPath");
      defs.append(...nextClipPaths);

      const nextShadows = next.querySelector(
        'g[data-strokesvg="shadows"]'
      ) as HTMLElement;
      const nextStrokes = next.querySelector(
        'g[data-strokesvg="strokes"]'
      ) as HTMLElement;
      nextShadows.style.translate = "800px";
      nextStrokes.style.translate = "800px";

      svg.appendChild(nextShadows);
      svg.appendChild(nextStrokes);
    }

    svgParent.replaceChildren(svg);

    animator = strokeAnimator(svg, {
      progressCallback: setProgress,
      markingsCallback: setMarkings,
    });
    animator.play();

    svgParent.focus();
  }

  const [progress, setProgress] = createSignal(1);
  const [markings, setMarkings] = createSignal([]);

  return (
    <Portal>
      <Show when={diagram.show}>
        <div
          // @ts-expect-error solid directive
          use:interactOutside={{
            stop: () => setDiagram("show", false),
            replay: () => {
              animator.setProgress(0);
              animator.play();
            },
            kana: diagram.kana,
          }}
          class={css({
            position: "absolute",
            background: "bg.default",
            borderRadius: "lg",
            borderWidth: 1,
            boxShadow: "lg",
            p: 4,
          })}
          style={{
            top:
              diagram.rect.bottom > window.innerHeight / 2
                ? `calc(${diagram.rect.top}px + ${window.scrollY}px - 10rem - 34px - 20px - 4px)`
                : `calc(${diagram.rect.bottom}px + ${window.scrollY}px + 4px)`,
            left: `calc(min(100% - 10rem - 34px - 8px, max(8px, ${diagram.rect.left}px - (10rem + 34px - ${diagram.rect.width}px) / 2))) `,
          }}
        >
          <IconButton
            variant="ghost"
            size="sm"
            class={css({ position: "absolute", right: 1, top: 1, zIndex: 10 })}
            onClick={() => setDiagram("show", false)}
          >
            <X />
          </IconButton>
          <div
            ref={svgParent}
            class={css({ width: "10rem", height: "10rem", display: "flex" })}
          ></div>
          <div class={css({ display: "flex" })}>
            <Slider
              min={0}
              max={1}
              step={0.01}
              value={[progress()]}
              marks={markings()}
              onValueChange={(e) => animator.setProgress(e.value[0])}
              onValueChangeEnd={() => animator.play()}
            />
          </div>
        </div>
      </Show>
    </Portal>
  );
}

function Credits(props) {
  return (
    <div {...props}>
      <p>
        愛で作成:{" "}
        <a
          href="https://github.com/zhengkyl"
          target="_blank"
          class={css({ textDecoration: "underline", color: "blue" })}
        >
          @zhengkyl
        </a>
      </p>
      <p>
        Source code{" "}
        <a
          href="https://github.com/zhengkyl/monodown/tree/main/apps/kana"
          target="_blank"
          class={css({ textDecoration: "underline", color: "blue" })}
        >
          here
        </a>
      </p>
      <p>
        Stroke diagrams from{" "}
        <a
          href="https://github.com/zhengkyl/strokesvg"
          target="_blank"
          class={css({ textDecoration: "underline", color: "blue" })}
        >
          StrokeSVG
        </a>
      </p>
    </div>
  );
}
