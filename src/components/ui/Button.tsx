import { Button as KButton } from "@kobalte/core";
import { ButtonRootProps } from "@kobalte/core/dist/types/button";
import { JSX, createSignal, splitProps } from "solid-js";
import { twMerge } from "tailwind-merge";

const size = {
  sm: "h-10 px-4 py-2",
  md: "h-12 px-6 py-3",
  lg: "h-16 px-10 py-5",
  icon: "h-12 w-14 text-2xl",
  "icon-lg": "h-16 w-18 text-3xl font-bold",
};

export interface ButtonProps extends ButtonRootProps {
  size?: "sm" | "md" | "lg";
  onTouchStart?: JSX.EventHandler<HTMLButtonElement, TouchEvent>;
  onTouchEnd?: JSX.EventHandler<HTMLButtonElement, TouchEvent>;
}

export function Button(props: ButtonProps) {
  const [, rest] = splitProps(props, [
    "size",
    "class",
    "classList",
    "onTouchStart",
    "onTouchEnd",
  ]);
  /**
   * active state works differently across browsers and for click/touch
   * eg. a slide tap will not trigger :active on chrome android 8/22/23
   * thus, we need to manually trigger an active style for touch
   */
  const [touchActive, setTouchActive] = createSignal(false);
  return (
    <KButton.Root
      onTouchStart={(e) => {
        setTouchActive(true);
        props.onTouchStart?.(e);
      }}
      onTouchEnd={(e) => {
        setTouchActive(false);
        props.onTouchEnd?.(e);
      }}
      class={twMerge(props.class, props.size && size[props.size])}
      classList={{
        "m-active": touchActive(),
        ...props.classList,
      }}
      {...rest}
    ></KButton.Root>
  );
}
