import * as Menu from "~/components/ui/Menu";
import { Button } from "~/components/ui/Button";
import { Show } from "solid-js";

export default function MenuButton(props) {
  return (
    <Menu.Root {...props}>
      <Menu.Trigger asChild>
        <Button variant="outline" size={props.buttonSize}>
          {props.children}
        </Button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.ItemGroup id="group-1">
            <Show when={props.itemGroupLabel}>
              <Menu.ItemGroupLabel for="group-1">
                {props.itemGroupLabel}
              </Menu.ItemGroupLabel>
              <Menu.Separator />
            </Show>
            {props.menuItems}
          </Menu.ItemGroup>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
}
