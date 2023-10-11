import { Button as KButton } from "@kobalte/core";
import { cva } from "class-variance-authority";
import { createSignal, splitProps } from "solid-js";
import { twMerge } from "tailwind-merge";

export const buttonVariants = cva(
  [
    "inline-flex",
    "justify-center",
    "items-center",
    "vertical-middle",
    "rounded-lg",
    "font-semibold",
    "select-none",
  ],
  {
    variants: {
      variant: {
        // fill: [
        //   // "bg-[hsl(var(--btn-h)_var(--btn-s)_var(--btn-l))]",
        //   "text-white",
        // ],
        line: [
          // "bg-white",
          // "border-[var(--btn-edge-color)]",
          "border-3",
          // "text-[var(--btn-edge-color)]",
          // "@hover:(bg-opacity-0 text-opacity-80 [--btn-edge-opacity:.8])",
          "disabled:(bg-stone-100 text-stone-300 border-stone-300)",
        ],
      },
      size: {
        // sm: "h-10 px-4 py-2",
        md: "h-16 w-16 text-3xl", // px-6 py-3",
        // lg: "h-16 px-10 py-5",
        // icon: "h-12 w-14 text-2xl",
        // "icon-lg": "h-16 w-18 text-3xl font-bold",
      },
    },
    defaultVariants: {
      variant: "line",
      size: "md",
    },
  }
);
export function Button2(props) {
  const [, rest] = splitProps(props, [
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
      class={twMerge(
        buttonVariants({ variant: "line", size: "md" }),
        props.class
      )}
      classList={{
        "m-active": touchActive(),
        ...props.classList,
      }}
      {...rest}
    ></KButton.Root>
  );
}
