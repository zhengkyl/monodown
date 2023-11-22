import { Accordion as KAccordion } from "@kobalte/core";
import { For, JSX, splitProps } from "solid-js";
import { Checkbox } from "./Checkbox";

type Props = KAccordion.AccordionRootProps & {
  items: { title: string; content: JSX.Element }[];
};

export function Accordion(props: Props) {
  const [, rest] = splitProps(props, ["items"]);

  return (
    <KAccordion.Root
      class="border border-foreground rounded-lg"
      defaultValue={["item-1"]}
      {...rest}
    >
      <For each={props.items}>
        {(item, i) => (
          <KAccordion.Item class="" value={`item-${i()}`}>
            <KAccordion.Header
              class="flex items-center bg-foreground/5"
              classList={{
                "border-t border-foreground": i() !== 0,
                "rounded-t-lg": i() === 0,
                "rounded-b-lg": i() === props.items.length - 1,
              }}
            >
              <Checkbox class="px-4" />
              <KAccordion.Trigger
                class="inline-flex w-full justify-end py-4 pr-4"
                classList={{
                  "rounded-tr-lg": i() === 0,
                  "rounded-br-lg": i() === props.items.length - 1,
                }}
              >
                <span class="font-bold mr-auto">{item.title}</span>
                <span class="">5/7 selected</span>
                <div class="i-uil:angle-down w-6 h-6 ml-3" aria-hidden></div>
              </KAccordion.Trigger>
            </KAccordion.Header>
            <KAccordion.Content class="overflow-hidden animate-slideUp data-[expanded]:animate-slideDown">
              <div class="p-4 pb-4">{item.content}</div>
            </KAccordion.Content>
          </KAccordion.Item>
        )}
      </For>
    </KAccordion.Root>
  );
}
