import { Checkbox as KCheckbox } from "@kobalte/core";
import { splitProps } from "solid-js";
import { twMerge } from "tailwind-merge";

export function Checkbox(props) {
  const [, rest] = splitProps(props, ["class"]);
  return (
    <KCheckbox.Root
      class={twMerge("inline-flex", "items-center", props.class)}
      {...rest}
    >
      <KCheckbox.Input class="checkbox__input" />
      <KCheckbox.Control class="h-[20px] w-[20px] border border-foreground rounded">
        <KCheckbox.Indicator class="h-full">
          <div class="i-uil:check h-full w-full"></div>
        </KCheckbox.Indicator>
      </KCheckbox.Control>
      {props.label && (
        <KCheckbox.Label class="pl-2 flex-1">{props.label}</KCheckbox.Label>
      )}
    </KCheckbox.Root>
  );
}
