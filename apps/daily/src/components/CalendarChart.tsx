import {
  CalendarDate,
  getDayOfWeek,
  startOfMonth,
} from "@internationalized/date";
import { BadgeCheck, Check, CheckCircle, CheckCircle2 } from "lucide-solid";
import { For, Match, Show, Switch, batch, createSignal } from "solid-js";
import { css } from "styled-system/css";
import { getDay, type Days, Status } from "~/lib/user";
import * as Select from "~/components/ui/Select";

type Props = {
  days: Days;
};

function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

const WEEKS_TO_SHOW = 52;
export function CalendarChart(props: Props) {
  const locale = "en";
  // const locale = "zh";

  const today = new Date();
  const currYear = today.getFullYear();
  const currMonth = today.getMonth() + 1;
  const currDate = today.getDate();

  const dayOfWeek = getDayOfWeek(
    new CalendarDate(currYear, currMonth, currDate),
    locale
  );

  const defaultVisibleDays = 7 * WEEKS_TO_SHOW + dayOfWeek;
  const defaultFirstDay = new Date(today);
  defaultFirstDay.setDate(currDate - defaultVisibleDays);

  const [firstDay, setFirstDay] = createSignal(defaultFirstDay);
  const [lastDay, setLastDay] = createSignal(today);

  const [padding, setPadding] = createSignal(0);

  const selectYears = ["2022", "2023", "2024", "Recent"];
  const [year, _setYear] = createSignal("2024");

  const setYear = (newYear: string) => {
    if (newYear === year()) return;

    const newYearNum = parseInt(newYear);
    batch(() => {
      _setYear(newYear);
      if (newYear === "Recent") {
        setFirstDay(defaultFirstDay);
        setLastDay(today);
        setPadding(0);
      } else {
        setFirstDay(new Date(newYearNum, 0, 1));
        setLastDay(
          newYearNum === currYear ? today : new Date(newYearNum, 11, 31)
        );
        setPadding(getDayOfWeek(new CalendarDate(newYearNum, 1, 1), locale));
      }
    });
  };

  const days = () => {
    const date = new Date(firstDay());
    const results = [];
    while (date <= lastDay()) {
      results.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return results;
  };

  return (
    <div class={css({ maxWidth: "sm", mx: "auto" })}>
      <Select.Root
        class={css({
          width: "fit-content",
          mx: "auto",
          py: 2,
        })}
        value={["2024"]}
        items={selectYears}
        onValueChange={(e) => setYear(e.value[0])}
      >
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText />
          </Select.Trigger>
        </Select.Control>
        <Select.Positioner>
          <Select.Content>
            {selectYears.map((item) => (
              <Select.Item key={item} item={item}>
                <Select.ItemText>{item}</Select.ItemText>
                <Select.ItemIndicator>
                  <Check />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Select.Root>
      <div
        class={css({
          position: "sticky",
          top: 2,
          gridColumn: "7",
          display: "flex",
          gap: 2,
          bg: "bg.default",
          borderWidth: 1,
          py: 2,
          px: 4,
          borderRadius: "md",
          boxShadow: "lg",
          textAlign: "center",
        })}
      >
        <For each={range(0, 7)}>
          {(diff) => {
            const day = new Date(firstDay());
            day.setDate(day.getDate() + diff);
            return (
              <div
                class={css({
                  flex: 1,
                  fontSize: "xl",
                  fontWeight: "bold",
                })}
              >
                {day.toLocaleDateString(locale, { weekday: "narrow" })}
              </div>
            );
          }}
        </For>
      </div>
      <div
        class={css({
          display: "grid",
          gridTemplateColumns: "7",
          gap: 2,
          p: 4,
          color: "accent.9",
        })}
      >
        {padding() && <div class={css({ gridColumn: padding() })}></div>}
        <For each={days()}>
          {(day) => {
            const date = day.getDate();
            // const month = day
            //   .toLocaleString(locale, { month: "short" })
            //   .toUpperCase();
            // const status = getDay(props.days, day)?.status;
            // console.log(status);
            return (
              <div
                title={day.toLocaleDateString(locale, { dateStyle: "full" })}
                class={css({
                  // borderWidth: 1,
                  background: day.getMonth() % 2 ? "mauve.4" : "sand.3",
                  borderRadius: "25%",
                  aspectRatio: "1 / 1",
                })}
              >
                {date}
                {/* <Switch>
                  <Match when={status !== Status.VISITED}>
                    <CheckCircle
                      class={css({
                        stroke: "grass.10",
                        width: "100%",
                        height: "100%",
                        p: "25%",
                      })}
                    />
                  </Match>
                </Switch> */}
              </div>
            );
          }}
        </For>
      </div>
    </div>
  );
}
