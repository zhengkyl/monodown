import { Accordion as KAccordion } from "@kobalte/core";
import { For, JSX, splitProps } from "solid-js";
import { twMerge } from "tailwind-merge";

type Props = KAccordion.AccordionRootProps & {
  items: { title: () => JSX.Element; content: () => JSX.Element }[];
};

export function Accordion(props: Props) {
  const [, rest] = splitProps(props, ["items", "class"]);

  return (
    <KAccordion.Root
      class={twMerge("border border-foreground rounded-lg", props.class)}
      defaultValue={["item-1"]}
      {...rest}
    >
      <For each={props.items}>
        {(item, i) => (
          <KAccordion.Item value={`item-${i()}`}>
            <KAccordion.Header
              class="flex items-center"
              classList={{
                "border-t border-foreground": i() !== 0,
                "rounded-t-lg": i() === 0,
                "rounded-b-lg": i() === props.items.length - 1,
              }}
            >
              <KAccordion.Trigger
                class="group inline-flex w-full justify-end p-4 border-foreground focus-visible:(outline-none ring-offset-background ring-offset-2 ring-ring ring-2)"
                classList={{
                  "rounded-t-lg": i() === 0,
                  "rounded-b-lg": i() === props.items.length - 1,
                }}
              >
                {item.title()}
              </KAccordion.Trigger>
            </KAccordion.Header>
            <KAccordion.Content class="overflow-hidden animate-slideUp data-[expanded]:animate-slideDown">
              <div
                class="p-4"
                //  border-t border-foreground
              >
                {item.content()}
              </div>
            </KAccordion.Content>
          </KAccordion.Item>
        )}
      </For>
    </KAccordion.Root>
  );
}
