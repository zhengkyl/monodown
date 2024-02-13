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
        position: "fixed",
        inset: 0,
        p: 4,
        display: "flex",
        flexDir: "column",
        justifyContent: "space-between",
        pointerEvents: "none",
        zIndex: 10,
        lg: {
          position: "sticky",
          height: "100svh",
          maxWidth: "96",
          flex: 1,
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
          pointerEvents: "all",
          boxShadow: "2xl",
          background: "bg.default",
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
      <div
        class={css({
          pointerEvents: "all",
          boxShadow: "2xl",
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
                size="xl"
              >
                Practice
              </Button>
              <Button
                width="100%"
                variant="outline"
                background="bg.default"
                size="sm"
              >
                Learn
              </Button>
            </>
          }
        >
          <Button
            width="100%"
            mb={1}
            colorPalette="green"
            size="xl"
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
  const { mode, sound, write, setDiagram } = useSettings();
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
                          px: 0,
                          fontSize: "md",
                          height: "unset",
                          userSelect: "text",
                          _disabled: {
                            cursor: "default",
                          },
                        })}
                        disabled={!exists}
                        onClick={(e) => {
                          if (sound()) audio.play();
                          if (write()) {
                            setDiagram({
                              kana: kanaInfo[mode()],
                              rect: e.currentTarget.getBoundingClientRect(),
                            });
                          }
                        }}
                      >
                        <Show when={exists}>
                          <div class={css({ p: 2, width: "100%" })}>
                            {kanaInfo[mode()]}
                            <div class={css({ fontSize: "sm" })}>
                              {kanaInfo.romaji[0]}
                            </div>
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

function StrokeDiagramPopover() {
  const { mode, diagram, setDiagram } = useSettings();

  createEffect(() => {
    if (diagram.kana == null) return;
    if (diagram.kana.length > 1) {
      setDiagram("kana", null);
      return;
    }

    loadSvg(untrack(mode), diagram.kana);

    onCleanup(() => {
      if (controller != null) controller.abort;
      removeEventListener("pointerdown", onPointerDown);
    });
  });

  let popover: HTMLDivElement;
  let svgParent: HTMLDivElement;
  let controller;
  let animator;

  async function loadSvg(mode, kana) {
    controller = new AbortController();

    const resp = await fetch(`/${mode}/${kana}.svg`);
    if (!resp.ok) return;
    controller = null;

    const text = await resp.text();
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(text, "text/html");
    const svg = doc.querySelector("svg");

    if (animator) animator.stop();
    svgParent.replaceChildren(svg);

    animator = strokeAnimator(svg, {
      progressCallback: setProgress,
      markingsCallback: setMarkings,
    });
    animator.play();

    svgParent.focus();

    document.addEventListener("pointerdown", onPointerDown);
  }

  const onPointerDown = (e) => {
    if (e.target === popover || popover.contains(e.target)) return;
    setDiagram("kana", null);
  };

  const [progress, setProgress] = createSignal(1);
  const [markings, setMarkings] = createSignal([]);

  // todo unhardcoded size 194 * 214
  //
  // stopPropogation() doesn't work b/c handlers are delegated
  // stopImmediatePropagation() still doesn't work b/c <Slider/> immediately triggers document events?

  return (
    <Portal>
      <Show when={diagram.kana != null}>
        <div
          ref={popover}
          class={css({
            position: "absolute",
            background: "bg.default",
            borderRadius: "lg",
            borderWidth: 1,
            boxShadow: "lg",
            p: 4,
          })}
          style={{
            top: `${
              diagram.rect.bottom > window.innerHeight / 2
                ? diagram.rect.top + window.scrollY - 214 - 4
                : diagram.rect.bottom + window.scrollY + 4
            }px`,
            left: `calc(min(100% - 194px - 8px, max(8px, ${
              diagram.rect.left - (194 - diagram.rect.width) / 2
            }px))) `,
          }}
        >
          <IconButton
            variant="ghost"
            size="sm"
            class={css({ position: "absolute", right: 1, top: 1, zIndex: 10 })}
            onClick={() => setDiagram("kana", null)}
          >
            <X />
          </IconButton>
          <div
            ref={svgParent}
            class={css({ width: "10rem", height: "10rem" })}
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
