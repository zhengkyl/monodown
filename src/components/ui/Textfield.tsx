import { TextField } from "@kobalte/core";
import { TextFieldRootProps } from "@kobalte/core/dist/types/text-field";
import { Show } from "solid-js";

export interface TextfieldProps extends TextFieldRootProps {
  label?: Element;
}

export function Textfield(props: TextfieldProps) {
  return (
    <TextField.Root {...props}>
      <Show when={props.label != null}>
        <TextField.Label>{props.label}</TextField.Label>
      </Show>
      <TextField.Input />
    </TextField.Root>
  );
}
