import * as Menu from "~/components/ui/Menu";
import { Button } from "~/components/ui/Button";
import { Show } from "solid-js";
import { css } from "styled-system/css";
import { UserIcon } from "lucide-solid";
import { IconButton } from "./ui/IconButton";

export default function MenuButton(props) {
  return (
    // TODO magic overflowPadding number
    <Menu.Root positioning={{ overflowPadding: 48 }}>
      <Menu.Trigger asChild>
        <IconButton variant="ghost">{props.children}</IconButton>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.ItemGroup id="group-1">
            <Menu.ItemGroupLabel for="group-1">My Account</Menu.ItemGroupLabel>
            <Menu.Separator />
            <Menu.Item id="profile">
              <div
                class={css({ display: "flex", alignItems: "center", gap: 2 })}
              >
                <UserIcon />
                Profile
              </div>
            </Menu.Item>
          </Menu.ItemGroup>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
}
