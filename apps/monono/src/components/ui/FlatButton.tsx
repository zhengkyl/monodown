import { Button as KButton } from "@kobalte/core";
import { splitProps } from "solid-js";
import { twMerge } from "tailwind-merge";
import { cva, type VariantProps } from "class-variance-authority";
import { ButtonRootProps } from "@kobalte/core/dist/types/button";

export const buttonVariants = cva(
  [
    "inline-flex",
    "justify-center",
    "items-center",
    "vertical-middle",
    // "rounded-lg",
    "rounded",
    "font-semibold",
    "select-none",
    "outline-none",
    "focus-visible:(ring-offset-background ring-offset-2 ring-ring ring-2)",
  ],
  {
    variants: {
      variant: {
        fill: [
          // "[--btn-edge-color:hsl(var(--btn-h)_var(--btn-s)_calc(var(--btn-l)-5%)/var(--btn-edge-opacity))]",
          // "bg-[hsl(var(--btn-h)_var(--btn-s)_var(--btn-l))]",
          // "text-white",
        ],
        line: ["border-foreground", "border"],
        text: [""],
      },
      size: {
        none: "",
        // sm: "h-10 px-4 py-2",
        // md: "h-12 px-6 py-3",
        // lg: "h-16 px-10 py-5",
        // icon: "h-12 w-13 text-2xl",
        // "icon-lg": "h-16 w-18 text-3xl font-bold",
      },
      // hue: {
      //   indigo: "[--btn-h:239] [--btn-s:84%] [--btn-l:67%]",
      //   green: "[--btn-h:142] [--btn-s:71%] [--btn-l:45%]",
      //   red: "[--btn-h:0] [--btn-s:84%] [--btn-l:60%]",
      //   stone: "[--btn-h:25] [--btn-s:5%] [--btn-l:45%]",
      //   default:
      //     "[--btn-h:270] [--btn-s:8%] [--btn-l:9%] dark:([--btn-h:60] [--btn-s:9.1%] [--btn-l:97.8%])",
      //   yellow: "[--btn-h:45] [--btn-s:93%] [--btn-l:47%]",
      // },
    },
    defaultVariants: {
      variant: "line",
      // size: "md",
      // hue: "default",
    },
  }
);

type Props = ButtonRootProps & VariantProps<typeof buttonVariants>;

export function FlatButton(props: Props) {
  const [, rest] = splitProps(props, [
    "variant",
    "size",
    //"hue",
    "class",
    "classList",
  ]);

  return (
    <KButton.Root
      classList={{
        [twMerge(
          buttonVariants({
            variant: props.variant,
            size: props.size,
            // hue: props.hue,
          }),
          props.class
        )]: true,
        ...props.classList,
      }}
      {...rest}
    ></KButton.Root>
  );
}
