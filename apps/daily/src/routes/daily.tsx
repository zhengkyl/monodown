import { Title } from "@solidjs/meta";
import { clientOnly } from "@solidjs/start";
import {
  Blend,
  Columns2,
  Dice4,
  Dice5,
  Dice6,
  Dices,
  Rabbit,
  Redo,
  Scissors,
  ScissorsLineDashed,
  Ticket,
} from "lucide-solid";
import { For, Match, Show, Switch, createSignal } from "solid-js";
import { isServer } from "solid-js/web";
import { css } from "styled-system/css";
import { Calendar } from "~/components/Calendar";
import MenuButton from "~/components/MenuButton";
import { Button } from "~/components/ui/Button";
import * as Menu from "~/components/ui/Menu";

const Quiz = clientOnly(() => import("../components/Quiz"));

export default function Daily() {
  return (
    <main class={css({})}>
      <Title>Daily</Title>
      <Quiz />
    </main>
  );
}

{
  /* <MenuButton
          itemGroupLabel="Lifelines"
          buttonSize="xl"
          menuItems={
            <>
              <Menu.Item id="skip">
                <div
                  class={css({ display: "flex", gap: 2, alignItems: "center" })}
                >
                  <Rabbit />
                  Skip
                </div>
              </Menu.Item>
              <Menu.Item id="50/50">
                <div
                  class={css({ display: "flex", gap: 2, alignItems: "center" })}
                >
                  <Scissors />
                  50/50
                </div>
              </Menu.Item>
              <Menu.Item id="reroll">
                <div
                  class={css({ display: "flex", gap: 2, alignItems: "center" })}
                >
                  <Dice5 />
                  Reroll
                </div>
              </Menu.Item>
            </>
          }
        >
          Lifelines
        </MenuButton> */
}
