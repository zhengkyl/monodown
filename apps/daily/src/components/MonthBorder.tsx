
type Props = {
  daysInMonth: number
  firstDayOfWeek: number // 0 = start of week
};

export function MonthBorder(props: Props) {

  const dayWidth = 10
  const gapWidth = 2
  const borderWidth = 1
  const width = 7 * dayWidth + 6 * gapWidth + 2 * borderWidth
  const height = width

  const radius = dayWidth / 4
  return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox={ `0 0 ${width} ${height}`  }class="" >
        <path d={ `A ${radius} ${radius} 0 0 0 ` }/>

      </svg>
  );
}
