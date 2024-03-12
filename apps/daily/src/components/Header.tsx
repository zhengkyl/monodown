import { FishIcon, FlameIcon, UserIcon } from "lucide-solid";
import { css } from "styled-system/css";
import { Button } from "./ui/Button";
import MenuButton from "./MenuButton";
import { IconButton } from "./ui/IconButton";

export default function Header(props) {
  return (
    <div
      class={css({
        position: "sticky",
        top: 0,
        bg: "bg.default",
        zIndex: "overlay",
        px: 4,
        py: 4,
        display: "flex",
        justifyContent: "space-between",
      })}
    >
      <IconButton variant="ghost">
        <FishIcon />
      </IconButton>
      <Button variant="outline" class={css({ fontSize: "xl" })}>
        {props.streak}
        <FlameIcon />
      </Button>
      <MenuButton>
        <UserIcon />
      </MenuButton>
    </div>
  );
}
