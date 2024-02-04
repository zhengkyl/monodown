import { Show, batch, createSignal } from "solid-js";
import { MultipleChoice, questions } from "~/components/MultipleChoice";
import { css } from "styled-system/css";
import { Button } from "./ui/Button";
import { Motion, Presence } from "solid-motionone";

enum Result {
  IN_PROGRESS,
  FAILURE,
  SUCCESS,
}

// export default b/c clientOnly() expects default
export default function Quiz() {
  const [index, setIndex] = createSignal(0);

  const [show, setShow] = createSignal(true);

  const onContinue = () => {
    // Must be batched, otherwise index() causes new props before Show exit transitions
    batch(() => {
      setIndex((i) => i + 1);
      if (index() >= questions.length) {
        setIndex(0);
      }
      // Force remount
      setShow((s) => !s);
    });
  };

  return (
    <div
      class={css({
        overflow: "hidden",
      })}
    >
      <div
        class={css({
          maxWidth: "breakpoint-sm",
          mx: "auto",
          height: "100svh",
          position: "relative",
        })}
      >
        <Presence exitBeforeEnter initial={false}>
          <Show
            when={show() && index() < questions.length}
            fallback={
              <Question question={questions[index()]} onContinue={onContinue} />
            }
          >
            <Question question={questions[index()]} onContinue={onContinue} />
          </Show>
        </Presence>
      </div>
    </div>
  );
}

function Question(props) {
  const [result, setResult] = createSignal(Result.IN_PROGRESS);
  const [answer, setAnswer] = createSignal(null);

  const onSubmit = () => {
    if (answer() === props.question.answer) {
      setResult(Result.SUCCESS);
    } else {
      setResult(Result.FAILURE);
    }
  };

  let continued = false;
  const onContinue = () => {
    if (continued) return;
    continued = true;

    props.onContinue();
  };

  return (
    <Motion
      initial={{
        translate: "10%",
        opacity: 0,
      }}
      animate={{
        translate: "0",
        opacity: 1,
      }}
      transition={{
        duration: 0.15,
        easing: "ease-out",
      }}
      exit={{
        translate: "-50%",
        opacity: 0,
        transition: {
          duration: 0.3,
          easing: "ease-in",
        },
      }}
      class={css({
        height: "100%",
        display: "flex",
        flexDir: "column",
        gap: 8,
        px: 4,
        py: 16,
      })}
    >
      <div class={css({ fontSize: "xl", fontWeight: "bold" })}>
        {props.question.directions}
      </div>
      <MultipleChoice
        question={props.question}
        answer={answer()}
        setAnswer={result() === Result.IN_PROGRESS ? setAnswer : null}
      />
      <Button
        colorPalette={result() === Result.FAILURE ? "red" : "green"}
        size="xl"
        width="full"
        onClick={result() === Result.IN_PROGRESS ? onSubmit : onContinue}
        class={css({ mt: "auto", zIndex: 10 })}
        disabled={answer() == null}
      >
        {result() === Result.IN_PROGRESS ? "Submit" : "Continue"}
      </Button>
      <div
        class={css({
          transition: "translate 300ms",
          translate: result() === Result.IN_PROGRESS ? "0 100%" : "0",
          position: "absolute",
          insetInline: 0,
          bottom: 0,
          background: "accent.5",
          px: 4,
          pt: 8,
          pb: 32,
        })}
      >
        <div class={css({ fontSize: "xl", fontWeight: "bold" })}>
          {result() === Result.FAILURE ? "Oops!" : "Good job!"}
        </div>
        <p class={css({ fontWeight: "medium" })}>{props.question.answer}</p>
      </div>
    </Motion>
  );
}
