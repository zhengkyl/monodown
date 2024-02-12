import { For, Show, createEffect, createSignal, untrack } from "solid-js";
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
  const { selected } = useSelected();
  const { mode, setMode, sound, setSound, write, setWrite } = useSettings();

  const [isSelecting, setIsSelecting] = createSignal(false);

  const [strokeDiagram, setStrokeDiagram] = createSignal<{
    kana: string;
    rect: DOMRect;
  }>(null);

  const anySelected = () =>
    Object.values(selected).some((groupSel) => groupSel.some((row) => row));

  createEffect(() => {
    if (strokeDiagram() == null) return;
    if (strokeDiagram().kana.length > 1) {
      setStrokeDiagram(null);
      return;
    }

    loadSvg(untrack(mode), strokeDiagram().kana);
  });

  let svgParent: HTMLDivElement;
  let controller;
  let animator;

  async function loadSvg(mode, kana) {
    if (controller != null) controller.abort;
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
  }

  const [progress, setProgress] = createSignal(1);
  const [markings, setMarkings] = createSignal([]);

  return (
    <main class={css({ display: "flex" })}>
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
            when={isSelecting()}
            fallback={
              <>
                <Button
                  width="100%"
                  mb={1}
                  onClick={[setIsSelecting, true]}
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
              onClick={[setIsSelecting, false]}
            >
              Cancel
            </Button>
          </Show>
        </div>
      </div>
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
        {["Gojūon", "Dakuon", "Combo"].map((title) => (
          <div
            class={css({
              display: "grid",
              gridTemplateColumns:
                title === "Combo"
                  ? "auto repeat(3, minmax(0, 1fr))"
                  : "auto repeat(5, minmax(0, 1fr))",
              gap: 2,
              marginLeft: isSelecting() ? 0 : -12,
              transition: "margin 300ms",
              flexGrow: 1,
            })}
          >
            <KanaGroup
              title={title}
              isSelecting={isSelecting()}
              setStrokeDiagram={setStrokeDiagram}
            />
          </div>
        ))}
      </div>

      <Portal>
        <Show when={strokeDiagram() != null}>
          <div
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
                strokeDiagram().rect.bottom > window.innerHeight / 2
                  ? strokeDiagram().rect.top + window.scrollY - 214
                  : strokeDiagram().rect.bottom + window.scrollY
              }px`,
              left: `calc(min(100% - 194px, max(0px, ${
                strokeDiagram().rect.left -
                (194 - strokeDiagram().rect.width) / 2
              }px))) `,
            }}
          >
            <IconButton
              variant="ghost"
              size="sm"
              class={css({ position: "absolute", right: 1, top: 1 })}
              onClick={[setStrokeDiagram, null]}
            >
              <X />
            </IconButton>
            <div ref={svgParent} class={css({ width: "10rem" })}></div>
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
    </main>
  );
}

function KanaGroup(props) {
  const { selected, setSelected } = useSelected();
  const { mode, sound, write } = useSettings();

  const allSelected = () => selected[props.title].every((s) => s);

  return (
    <>
      <IconButton
        variant="outline"
        onClick={() =>
          setSelected(
            props.title,
            Array(selected[props.title].length).fill(!allSelected())
          )
        }
        class={css({
          opacity: props.isSelecting ? null : 0,
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
          const rowSelected = () =>
            props.isSelecting && selected[props.title][i()];
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
                  opacity: props.isSelecting ? null : 0,
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
                            props.setStrokeDiagram({
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
    </>
  );
}
