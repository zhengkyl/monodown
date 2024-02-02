import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-solid";
import { For, Index } from "solid-js";
import { Button } from "~/components/ui/Button";
import * as DatePicker from "~/components/ui/DatePicker";
import { IconButton } from "~/components/ui/IconButton";

export const Calendar = (props: DatePicker.RootProps) => {
  return (
    <DatePicker.Root
      positioning={{ sameWidth: true }}
      startOfWeek={0}
      locale="en"
      // selectionMode="range"
      {...props}
    >
      <DatePicker.Label>Date Picker</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Trigger asChild>
          <IconButton variant="outline" aria-label="Open date picker">
            <CalendarIcon />
          </IconButton>
        </DatePicker.Trigger>
      </DatePicker.Control>
      <DatePicker.Positioner>
        <DatePicker.Content>
          <DatePicker.View view="day">
            {(api) => (
              <>
                <DatePicker.ViewControl>
                  <DatePicker.PrevTrigger asChild>
                    <IconButton variant="ghost" size="sm">
                      <ChevronLeftIcon />
                    </IconButton>
                  </DatePicker.PrevTrigger>
                  <DatePicker.ViewTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <DatePicker.RangeText />
                    </Button>
                  </DatePicker.ViewTrigger>
                  <DatePicker.NextTrigger asChild>
                    <IconButton variant="ghost" size="sm">
                      <ChevronRightIcon />
                    </IconButton>
                  </DatePicker.NextTrigger>
                </DatePicker.ViewControl>
                <DatePicker.Table>
                  <DatePicker.TableHead>
                    <DatePicker.TableRow>
                      <Index each={api().weekDays}>
                        {(weekDay) => (
                          <DatePicker.TableHeader>
                            {weekDay().narrow}
                          </DatePicker.TableHeader>
                        )}
                      </Index>
                    </DatePicker.TableRow>
                  </DatePicker.TableHead>
                  <DatePicker.TableBody>
                    <For each={api().weeks}>
                      {(week) => (
                        <DatePicker.TableRow>
                          <For each={week}>
                            {(day) => (
                              <DatePicker.TableCell value={day}>
                                <DatePicker.TableCellTrigger asChild>
                                  <IconButton variant="ghost">
                                    {day.day}
                                  </IconButton>
                                </DatePicker.TableCellTrigger>
                              </DatePicker.TableCell>
                            )}
                          </For>
                        </DatePicker.TableRow>
                      )}
                    </For>
                  </DatePicker.TableBody>
                </DatePicker.Table>
              </>
            )}
          </DatePicker.View>
          <DatePicker.View view="month">
            {(api) => (
              <>
                <DatePicker.ViewControl>
                  <DatePicker.PrevTrigger asChild>
                    <IconButton variant="ghost" size="sm">
                      <ChevronLeftIcon />
                    </IconButton>
                  </DatePicker.PrevTrigger>
                  <DatePicker.ViewTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <DatePicker.RangeText />
                    </Button>
                  </DatePicker.ViewTrigger>
                  <DatePicker.NextTrigger asChild>
                    <IconButton variant="ghost" size="sm">
                      <ChevronRightIcon />
                    </IconButton>
                  </DatePicker.NextTrigger>
                </DatePicker.ViewControl>
                <DatePicker.Table>
                  <DatePicker.TableBody>
                    <Index
                      each={api().getMonthsGrid({
                        columns: 4,
                        format: "short",
                      })}
                    >
                      {(months) => (
                        <DatePicker.TableRow>
                          <Index each={months()}>
                            {(month) => (
                              <DatePicker.TableCell value={month().value}>
                                <DatePicker.TableCellTrigger asChild>
                                  <Button variant="ghost">
                                    {month().label}
                                  </Button>
                                </DatePicker.TableCellTrigger>
                              </DatePicker.TableCell>
                            )}
                          </Index>
                        </DatePicker.TableRow>
                      )}
                    </Index>
                  </DatePicker.TableBody>
                </DatePicker.Table>
              </>
            )}
          </DatePicker.View>
          <DatePicker.View view="year">
            {(api) => (
              <>
                <DatePicker.ViewControl>
                  <DatePicker.PrevTrigger asChild>
                    <IconButton variant="ghost" size="sm">
                      <ChevronLeftIcon />
                    </IconButton>
                  </DatePicker.PrevTrigger>
                  <DatePicker.ViewTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <DatePicker.RangeText />
                    </Button>
                  </DatePicker.ViewTrigger>
                  <DatePicker.NextTrigger asChild>
                    <IconButton variant="ghost" size="sm">
                      <ChevronRightIcon />
                    </IconButton>
                  </DatePicker.NextTrigger>
                </DatePicker.ViewControl>
                <DatePicker.Table>
                  <DatePicker.TableBody>
                    <Index each={api().getYearsGrid({ columns: 4 })}>
                      {(years) => (
                        <DatePicker.TableRow>
                          <Index each={years()}>
                            {(year) => (
                              <DatePicker.TableCell value={year().value}>
                                <DatePicker.TableCellTrigger asChild>
                                  <Button variant="ghost">
                                    {year().label}
                                  </Button>
                                </DatePicker.TableCellTrigger>
                              </DatePicker.TableCell>
                            )}
                          </Index>
                        </DatePicker.TableRow>
                      )}
                    </Index>
                  </DatePicker.TableBody>
                </DatePicker.Table>
              </>
            )}
          </DatePicker.View>
        </DatePicker.Content>
      </DatePicker.Positioner>
    </DatePicker.Root>
  );
};
