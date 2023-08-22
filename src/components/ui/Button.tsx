import { Button as KButton } from "@kobalte/core";
import { ButtonRootProps } from "@kobalte/core/dist/types/button";
import { JSX, createSignal, splitProps } from "solid-js";
import { twMerge } from "tailwind-merge";
import { buttonActive } from "~/styles/button";

const size = {
  sm: "h-10 px-4 py-2",
  md: "h-12 px-6 py-3",
  lg: "h-16 px-10 py-5",
  icon: "h-12 w-14 text-2xl",
  "icon-lg": "h-16 w-18 text-3xl font-bold",
};

export interface ButtonProps extends ButtonRootProps {
  size?: "sm" | "md" | "lg";
  onPointerDown?: JSX.EventHandler<HTMLButtonElement, PointerEvent>;
  onPointerUp?: JSX.EventHandler<HTMLButtonElement, PointerEvent>;
}

export function Button(props: ButtonProps) {
  const [, rest] = splitProps(props, [
    "size",
    "class",
    "classList",
    "onPointerDown",
    "onPointerUp",
  ]);
  /**
   * active state works differently across browsers
   * eg. a slide tap will not trigger :active on chrome android 8/22/23
   * thus, we need custom active variable
   */
  const [active, setActive] = createSignal(false);
  return (
    <KButton.Root
      onPointerDown={(e) => {
        setActive(true);
        props.onPointerDown?.(e);
      }}
      onPointerUp={(e) => {
        setActive(false);
        props.onPointerUp?.(e);
      }}
      class={twMerge(props.class, props.size && size[props.size])}
      classList={{
        [buttonActive]: active(),
        ...props.classList,
      }}
      {...rest}
    ></KButton.Root>
  );
}
