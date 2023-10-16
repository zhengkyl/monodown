import { A } from "solid-start";
import Icon from "../assets/svg/icon.svg";
export function Header() {
  return (
    <header class="px-8 py-2 flex justify-between">
      <A href="./" class="flex items-center gap-2 font-bold">
        <Icon class="w-9 h-9" />
        monodown
      </A>
      <div class="flex items-center gap-4 font-bold">
        <A href="./learn">Learn</A>
        <A href="./test">Test</A>
        <A href="./components">Components</A>
        <A href="./dungeon">Dungeon</A>
      </div>
    </header>
  );
}
