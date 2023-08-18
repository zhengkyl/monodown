import { Component, For, Show, createSignal } from "solid-js";
import MultipleChoice, { MultipleChoiceProps } from "./MultipleChoice";
import { Dynamic } from "solid-js/web";

export type SharedProps = {
  onContinue: () => void;
};

export type Question = { type: "MultipleChoice"; props: MultipleChoiceProps };

type Renderer<T extends Question> = T extends Question
  ? { [type in T["type"]]: Component<T["props"] & SharedProps> }
  : never;

const Renderer: Renderer<Question> = {
  MultipleChoice,
};

type Props = {
  questions: Question[];
};

export function Quiz(props: Props) {
  const [index, setIndex] = createSignal(0);

  const [show, setShow] = createSignal(true);

  const onContinue = () => {
    setIndex(index() + 1);
    // Force unmount renderer to reset state
    setShow(false);
    setShow(true);
  };

  const question = () =>
    index() < props.questions.length ? props.questions[index()] : null;

  return (
    <Show when={show() && question() != null} fallback={<p>congrat</p>}>
      <Dynamic
        component={Renderer[question().type]}
        {...question().props}
        onContinue={onContinue}
      />
    </Show>
  );
}
