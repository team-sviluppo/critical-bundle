import { useUncontrolled } from '@mantine/hooks';

function useUncontrolledDates({
  type,
  value,
  defaultValue,
  onChange
}) {
  return useUncontrolled({
    value,
    defaultValue,
    onChange,
    finalValue: type === "range" ? [null, null] : type === "multiple" ? [] : null
  });
}

export { useUncontrolledDates };
//# sourceMappingURL=use-uncontrolled-dates.js.map
