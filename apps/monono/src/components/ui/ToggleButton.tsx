import { Tabs } from "@kobalte/core";
import { TabsRootProps } from "@kobalte/core/dist/types/tabs";
import { For, splitProps } from "solid-js";

type Props = TabsRootProps & {
  toggles: {
    value: string;
    text: string;
  }[];
};

export function ToggleButton(props: Props) {
  const [, rest] = splitProps(props, ["class", "classList"]);
  return (
    <Tabs.Root
      classList={{
        [props.class]: !!props.class,
        ...props.classList,
      }}
      {...rest}
    >
      <Tabs.List class="flex gap-2 p-2 rounded-lg border border-foreground">
        <For each={props.toggles}>
          {(toggle, i) => (
            <Tabs.Trigger
              class="flex-1 p-2 font-bold rounded outline-none focus-visible:(ring-offset-background ring-offset-2 ring-ring ring-2) data-[selected]:(bg-foreground text-background) transition-colors"
              value={toggle.value}
            >
              {toggle.text}
            </Tabs.Trigger>
          )}
        </For>
      </Tabs.List>
    </Tabs.Root>
  );
}
