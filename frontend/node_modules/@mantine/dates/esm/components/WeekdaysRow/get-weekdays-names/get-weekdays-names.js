import dayjs from 'dayjs';

function getWeekdayNames({
  locale,
  format = "dd",
  firstDayOfWeek = 1
}) {
  const baseDate = dayjs().startOf("week");
  const labels = [];
  for (let i = 0; i < 7; i += 1) {
    labels.push(dayjs(baseDate).add(i, "days").locale(locale).format(format));
  }
  return [...labels.slice(firstDayOfWeek), ...labels.slice(0, firstDayOfWeek)];
}

export { getWeekdayNames };
//# sourceMappingURL=get-weekdays-names.js.map
