import { Button as KButton } from "@kobalte/core";
import { VariantProps, cva } from "class-variance-authority";
import { JSX, splitProps } from "solid-js";
import { twMerge } from "tailwind-merge";

const buttonVariants = cva(
  "inline-flex justify-center items-center vertical-middle rounded-lg font-semibold shadow-[0_6px_0_var(--un-shadow-color)] active:shadow-none active:translate-y-[6px] transition-all disabled:opacity-50 mb-[6px]",
  {
    variants: {
      variant: {
        fill: "bg-indigo-500 hover:bg-opacity-90 shadow-indigo-600 hover:shadow-opacity-90 text-white",
        outline:
          "hover:bg-indigo-50/10 border-2 shadow-neutral-200 hover:shadow-indigo-500 border-neutral-200 hover:border-indigo-500 hover:text-indigo-600 dark:text-white",
      },
      size: {
        sm: "h-10 px-4 py-2",
        md: "h-12 px-6 py-3",
        lg: "h-16 px-10 py-5",
        icon: "h-12 w-14 text-2xl",
        "icon-lg": "h-16 w-18 text-3xl font-bold",
      },
    },
    defaultVariants: {
      variant: "fill",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends JSX.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button(props: ButtonProps) {
  const [, rest] = splitProps(props, ["variant", "size", "class"]);
  return (
    <KButton.Root
      {...rest}
      class={twMerge(
        buttonVariants({
          variant: props.variant,
          size: props.size,
          class: props.class,
        })
      )}
    ></KButton.Root>
  );
}
