import {
  CalendarDate,
  getDayOfWeek,
  startOfMonth,
} from "@internationalized/date";
import { BadgeCheck, CheckCircle, CheckCircle2 } from "lucide-solid";
import { For, Match, Show, Switch, createSignal } from "solid-js";
import { css } from "styled-system/css";
import { getDay, type Days, Status } from "~/lib/user";

type Props = {
  days: Days;
};

function range(start, end) {
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
}




export function CalendarChart(props: Props) {
  // grid for each month
  // scroll load month by month, until no more previous?
  const locale = "en";

  // const currYear = today.getFullYear();
  // const currMonth = today.getMonth() + 1;
  // const currDate = today.getDate();

  // TODO some calendars don't have 12 months
  // const [firstMonth, setFirstMonth] = createSignal(
  //   currMonth - 1 ? currMonth - 1 : 12
  // );
  // const [lastMonth, setLastMonth] = createSignal(currMonth);

  // const lastDay = new CalendarDate(currYear, currMonth, currDate);
  const today = new Date();
  const diff = today.getDay() + 35;
  const firstDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - diff
  );

  // firstDay.subtract()
  // const padding = getDayOfWeek(firstDay, "en");

  // const daysInMonth =
  //   month === currMonth
  //     ? currDate
  //     : firstDay.calendar.getDaysInMonth(firstDay);
  return (
    <div class={css({ maxWidth: "sm" })}>
      <div
        class={css({
          display: "grid",
          gridTemplateColumns: "7",
          gap: 1,
          // fontSize: "2xl",
          // fontWeight: "bold",
          color: "accent.9",
          textAlign: "center",
        })}
      >
        <For each={range(0, diff)}>
          {(change) => {
            const day = new Date(firstDay);
            day.setDate(day.getDate() + change);

            const date = day.getDate();
            // const month = day
            //   .toLocaleString(locale, { month: "short" })
            //   .toUpperCase();
            const status = getDay(props.days, day)?.status;
            // console.log(status);
            return (
              <div
                class={css({
                  // borderWidth: 1,
                  borderRadius: "md",
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
