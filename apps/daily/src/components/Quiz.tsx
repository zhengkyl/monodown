import { Show, batch, createSignal } from "solid-js";
import { css } from "styled-system/css";
import { Motion, Presence } from "solid-motionone";

import { MultipleChoice, questions } from "~/components/MultipleChoice";
import { LinearProgress } from "~/components/ui/LinearProgress";
import { Button } from "~/components/ui/Button";

enum Result {
  IN_PROGRESS,
  FAILURE,
  SUCCESS,
}

function getSkewedProgress(index, length, minInc = 0.5) {
  // triangle with dims length * 2(1-minInc)
  // rectangle with dims length * minInc
  // f(index) = 2 - minInc - (2-2minInc)/length * x
  //
  // this is integral
  return (2 - minInc) * index - ((1 - minInc) / length) * index * index;
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
          display: "flex",
          flexDir: "column",
        })}
      >
        <div
          class={css({
            p: 4,
          })}
        >
          <LinearProgress
            min={0}
            max={questions.length}
            value={getSkewedProgress(index(), questions.length)}
          />
        </div>

        <Presence exitBeforeEnter initial={false}>
          <Show when={index() < questions.length}>
            <Show
              when={show()}
              fallback={
                <Question
                  question={questions[index()]}
                  onContinue={onContinue}
                />
              }
            >
              <Question question={questions[index()]} onContinue={onContinue} />
            </Show>
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
        translate: 0,
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
        py: 8,
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
      <Show
        when={result() === Result.IN_PROGRESS}
        fallback={
          <Button
            colorPalette={result() === Result.FAILURE ? "red" : "grass"}
            size="xl"
            width="full"
            onClick={onContinue}
            class={css({ mt: "auto", zIndex: 10 })}
          >
            Continue
          </Button>
        }
      >
        <Button
          colorPalette="indigo"
          size="xl"
          width="full"
          onClick={onSubmit}
          class={css({ mt: "auto", zIndex: 10 })}
          disabled={answer() == null}
        >
          Submit
        </Button>
      </Show>
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
          pb: 28,
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
