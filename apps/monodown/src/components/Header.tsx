import { A } from "solid-start";
import Icon from "../assets/svg/icon.svg";
import { Switch } from "@kobalte/core";
import { createEffect, createSignal } from "solid-js";

export function Header() {
  return (
    <header class="px-8 py-2 flex justify-between border-b">
      <A href="./" class="flex items-center gap-2 font-bold">
        <Icon class="w-9 h-9" />
        monodown
      </A>
      <div class="flex items-center gap-4 font-bold">
        <A href="./learn">Learn</A>
        <A href="./test">Test</A>
        <A href="./components">Components</A>
        <A href="./dungeon">Dungeon</A>
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
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  });

  return (
    <Switch.Root
      class="inline-flex items-center"
      checked={darkMode()}
      onChange={setDarkMode}
    >
      {/* <Switch.Label class="mr-[6px] select-none text-sm">
        Dark Mode
      </Switch.Label> */}
      <Switch.Input class="peer" />
      <Switch.Control class="inline-flex items-center bg-stone-200 border rounded-[12px] h-[24px] w-[46px] px-[2px] peer-focus:(ring-2 ring-ring ring-offset-2 ring-offset-background) data-[checked]:(border bg-stone-800)">
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
