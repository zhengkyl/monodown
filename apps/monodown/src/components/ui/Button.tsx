import { Button as KButton } from "@kobalte/core";
import { JSX, createSignal, splitProps } from "solid-js";
import { twMerge } from "tailwind-merge";
import { cva, type VariantProps } from "class-variance-authority";
import { ButtonRootProps } from "@kobalte/core/dist/types/button";

export const buttonVariants = cva(
  [
    "inline-flex",
    "justify-center",
    "items-center",
    "vertical-middle",
    "rounded-lg",
    "font-semibold",
    "select-none",
    "[box-shadow:0_var(--btn-depth)_0_var(--un-shadow-color)]", // use arbitary to avoid tailwind-merge conflict
    "mb-[var(--btn-depth)]",

    "[--btn-depth:3px]",
    "[--btn-edge-opacity:1]",
    "[--btn-edge-color:hsl(var(--btn-h)_var(--btn-s)_calc(var(--btn-l)-5%)/var(--btn-edge-opacity))]",
    "[--un-shadow-color:var(--btn-edge-color)]",
  ],
  {
    variants: {
      variant: {
        fill: [
          "bg-[hsl(var(--btn-h)_var(--btn-s)_var(--btn-l))]",
          "text-white",
        ],
        line: [
          "bg-white",
          "border-[var(--btn-edge-color)]",
          "border-2",
          "text-[var(--btn-edge-color)]",
        ],
      },
      size: {
        sm: "h-10 px-4 py-2",
        md: "h-12 px-6 py-3",
        lg: "h-16 px-10 py-5",
        icon: "h-12 w-14 text-2xl",
        "icon-lg": "h-16 w-18 text-3xl font-bold",
      },
      hue: {
        indigo: "[--btn-h:239] [--btn-s:84%] [--btn-l:67%]",
        green: "[--btn-h:142] [--btn-s:71%] [--btn-l:45%]",
        red: "[--btn-h:0] [--btn-s:84%] [--btn-l:60%]",
        stone: "[--btn-h:25] [--btn-s:5%] [--btn-l:45%]",
        default: "[--btn-h:0] [--btn-s:0%] [--btn-l:83%]",
      },
      element: {
        button: [
          "[--btn-travel:3px]",
          `d-active:(shadow-none translate-y-[var(--btn-travel)])`,
          `m-active:(shadow-none translate-y-[var(--btn-travel)])`,
          `disabled:(shadow-none translate-y-[var(--btn-travel)] pointer-events-none)`,
        ],
        block: "",
      },
    },
    compoundVariants: [
      {
        variant: "line",
        element: "button",
        class: [
          "@hover:(bg-opacity-0 text-opacity-80 [--btn-edge-opacity:.8])",
          "disabled:(bg-stone-100 text-stone-300 border-stone-300)",
        ],
      },
      {
        variant: "fill",
        element: "button",
        class: [
          "@hover:(bg-opacity-95 [--btn-edge-opacity:.95])",
          "disabled:(bg-stone-200 text-stone-400 shadow-stone-400)",
        ],
      },
      {
        variant: "line",
        hue: "default",
        class: "text-dark",
      },
    ],
    defaultVariants: {
      variant: "line",
      size: "md",
      hue: "default",
      element: "button",
    },
  }
);

export interface ButtonProps
  extends ButtonRootProps,
    VariantProps<typeof buttonVariants> {
  onTouchStart?: JSX.EventHandler<HTMLButtonElement, TouchEvent>;
  onTouchEnd?: JSX.EventHandler<HTMLButtonElement, TouchEvent>;
}

export function Button(props: ButtonProps) {
  const [, rest] = splitProps(props, [
    "variant",
    "size",
    "hue",
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
        buttonVariants({
          variant: props.variant,
          size: props.size,
          hue: props.hue,
        }),
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
