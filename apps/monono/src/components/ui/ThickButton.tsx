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

    "[--btn-edge-opacity:1]",
    "[--un-shadow-color:var(--btn-edge-color)]",
  ],
  {
    variants: {
      variant: {
        fill: [
          "[--btn-edge-color:hsl(var(--btn-h)_var(--btn-s)_calc(var(--btn-l)-5%)/var(--btn-edge-opacity))]",
          "bg-[hsl(var(--btn-h)_var(--btn-s)_var(--btn-l))]",
          "text-white",
        ],
        line: [
          "[--btn-edge-color:hsl(var(--btn-h)_var(--btn-s)_calc(var(--btn-l))/var(--btn-edge-opacity))]",
          "bg-background",
          "border-[var(--btn-edge-color)]",
          "border-2",
          "text-[var(--btn-edge-color)]",
        ],
      },
      depth: {
        3: "[--btn-depth:3px] [--btn-travel:3px]",
        5: "[--btn-depth:5px] [--btn-travel:5px]",
      },
      size: {
        none: "",
        sm: "h-10 px-4 py-2",
        md: "h-12 px-6 py-3",
        lg: "h-16 px-10 py-5",
        icon: "h-12 w-13 text-2xl",
        "icon-lg": "h-16 w-18 text-3xl font-bold",
      },
      hue: {
        indigo: "[--btn-h:239] [--btn-s:84%] [--btn-l:67%]",
        green: "[--btn-h:142] [--btn-s:71%] [--btn-l:45%]",
        red: "[--btn-h:0] [--btn-s:84%] [--btn-l:60%]",
        stone: "[--btn-h:25] [--btn-s:5%] [--btn-l:45%]",
        default:
          "[--btn-h:270] [--btn-s:8%] [--btn-l:9%] dark:([--btn-h:60] [--btn-s:9.1%] [--btn-l:97.8%])",
        yellow: "[--btn-h:45] [--btn-s:93%] [--btn-l:47%]",
      },
      element: {
        button: [
          `d-active:(shadow-none translate-y-[var(--btn-travel)])`,
          `m-active:(shadow-none translate-y-[var(--btn-travel)])`,
          `disabled:(shadow-none translate-y-[var(--btn-travel)] pointer-events-none)`,
        ],
        block: "",
      },
    },
    compoundVariants: [
      {
        variant: "fill",
        hue: "default",
        class: "text-background",
      },
      {
        variant: "line",
        element: "button",
        class: [
          "@hover:(bg-opacity-0 text-opacity-80 [--btn-edge-opacity:.8])",
          // "disabled:(bg-stone-100 text-stone-300 border-stone-300)",
        ],
      },
      {
        variant: "fill",
        element: "button",
        class: [
          "@hover:(bg-opacity-95 [--btn-edge-opacity:.95])",
          "disabled:(bg-muted text-muted-foreground)",
        ],
      },
    ],
    defaultVariants: {
      variant: "line",
      size: "md",
      hue: "default",
      element: "button",
      depth: 3,
    },
  }
);

type Props = ButtonRootProps &
  VariantProps<typeof buttonVariants> & {
    onTouchStart?: JSX.EventHandler<HTMLButtonElement, TouchEvent>;
    onTouchEnd?: JSX.EventHandler<HTMLButtonElement, TouchEvent>;
  };
export function ThickButton(props: Props) {
  const [, rest] = splitProps(props, [
    "variant",
    "size",
    "hue",
    "depth",
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
          depth: props.depth,
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
