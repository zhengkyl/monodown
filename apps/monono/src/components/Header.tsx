import { A } from "solid-start";
import Icon from "../assets/svg/icon.svg";
import { Switch } from "@kobalte/core";
import { createEffect, createSignal } from "solid-js";

export function Header() {
  return (
    <header class="border-b flex lg:(border-none sticky top-0 z-11)">
      <A
        href="./"
        class="flex items-center gap-2 font-bold py-2 w-[250px] px-6 lg:(px-8)"
      >
        <Icon class="w-8 h-8" />
        monono
      </A>
      <div class="bg-background flex-1 flex justify-end mx-6 lg:(mx-8 border-b)">
        <DarkModeToggle />
      </div>
    </header>
  );
}

const getTheme = () => {
  if (typeof localStorage === "undefined") return "light";

  const saved = localStorage.getItem("theme");
  if (saved) return saved;

  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  } else {
    return "light";
  }
};

function DarkModeToggle() {
  const [darkMode, setDarkMode] = createSignal(getTheme() === "dark");

  // See root.tsx for logic that sets dark class before hydration
  createEffect(() => {
    if (darkMode()) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  });

  return (
    <Switch.Root
      class="inline-flex items-center cursor-pointer"
      checked={darkMode()}
      onChange={setDarkMode}
      aria-label={darkMode() ? "light mode switch" : "dark mode switch"}
    >
      <Switch.Input class="peer" />
      <Switch.Control class="inline-flex items-center bg-muted border border-muted-foreground rounded-[12px] h-[24px] w-[46px] px-[2px] peer-focus-visible:(ring-2 ring-ring ring-offset-2 ring-offset-background)">
        <Switch.Thumb class="inline-flex items-center h-[20px] w-[20px] rounded-[10px] transition-transform bg-background data-[checked]:translate-x-full">
          <div
            class="m-auto p-[2px]"
            classList={{ "i-uil:moon": darkMode(), "i-uil:sun": !darkMode() }}
          ></div>
        </Switch.Thumb>
      </Switch.Control>
    </Switch.Root>
  );
}
