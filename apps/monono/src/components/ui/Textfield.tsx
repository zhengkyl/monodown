import { TextField } from "@kobalte/core";
import { TextFieldRootProps } from "@kobalte/core/dist/types/text-field";
import { Show, splitProps } from "solid-js";

interface TextfieldProps extends TextFieldRootProps {
  ref?: HTMLInputElement;
  label?: Element;
}

export function Textfield(props: TextfieldProps) {
  const [, rest] = splitProps(props, ["ref", "label"]);
  return (
    <TextField.Root {...rest}>
      <Show when={props.label != null}>
        <TextField.Label>{props.label}</TextField.Label>
      </Show>
      <TextField.Input
        ref={props.ref}
        class="px-2 py-2 h-10 w-full bg-background rounded-md border border-input focus-visible:(outline-none ring-offset-2 ring-ring ring-2) placeholder:text-muted-foreground disabled:opacity-50"
      />
    </TextField.Root>
  );
}
