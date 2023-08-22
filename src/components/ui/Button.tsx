import { Button as KButton } from "@kobalte/core";
import { ButtonRootProps } from "@kobalte/core/dist/types/button";
import { JSX, createSignal, splitProps } from "solid-js";
import { twMerge } from "tailwind-merge";

// const buttonVariants = cva(
//   "inline-flex justify-center items-center vertical-middle rounded-lg font-semibold shadow-[0_6px_0_var(--un-shadow-color)] active:shadow-none active:translate-y-[6px] transition-all disabled:opacity-50 mb-[6px]",
//   {
//     variants: {
//       variant: {
//         fill: "bg-indigo-500 hover:bg-opacity-90 shadow-indigo-600 hover:shadow-opacity-90 text-white",
//         outline:
//           "hover:bg-indigo-50/10 border-2 shadow-neutral-200 hover:shadow-indigo-500 border-neutral-200 hover:border-indigo-500 hover:text-indigo-600 dark:text-white",
//       },
//       size: {
//         sm: "h-10 px-4 py-2",
//         md: "h-12 px-6 py-3",
//         lg: "h-16 px-10 py-5",
//         icon: "h-12 w-14 text-2xl",
//         "icon-lg": "h-16 w-18 text-3xl font-bold",
//       },
//     },
//     defaultVariants: {
//       variant: "fill",
//       size: "md",
//     },
//   }
// );

const size = {
  sm: "h-10 px-4 py-2",
  md: "h-12 px-6 py-3",
  lg: "h-16 px-10 py-5",
  icon: "h-12 w-14 text-2xl",
  "icon-lg": "h-16 w-18 text-3xl font-bold",
};

const buttonActive = `active:(shadow-none translate-y-[4px])`;
export interface ButtonProps extends ButtonRootProps {
  size?: "sm" | "md" | "lg";
}

export function Button(props: ButtonProps) {
  const [, rest] = splitProps(props, ["size", "class", "classList"]);
  const [active, setActive] = createSignal(false);
  return (
    <KButton.Root
      onTouchStart={[setActive, true]}
      onMouseDown={[setActive, true]}
      onTouchEnd={[setActive, false]}
      onMouseUp={[setActive, false]}
      class={twMerge(props.class, props.size && size[props.size])}
      classList={{
        [buttonActive]: active(),
        ...props.classList,
      }}
      {...rest}
    ></KButton.Root>
  );
}
