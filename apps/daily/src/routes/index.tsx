import { Title } from "@solidjs/meta";
import { css } from "styled-system/css";
import { CalendarChart } from "~/components/CalendarChart";
import Header from "~/components/Header";
import { Button } from "~/components/ui/Button";
import { getStreak, useUser } from "~/lib/user";

export default function Home() {
  const { days } = useUser();

  const streak = () => getStreak(days);

  return (
    <>
      <Title>Daily</Title>
      <Header streak={streak()} />
      <main class={css({})}>
        <CalendarChart days={days} />
        <Button colorPalette="grass">Daily</Button>
      </main>
      <div
        class={css({
          position: "sticky",
          bottom: 0,
          bg: "red",
          h: 10,
          w: "100%",
          zIndex: "overlay",
        })}
      ></div>
    </>
  );
}
