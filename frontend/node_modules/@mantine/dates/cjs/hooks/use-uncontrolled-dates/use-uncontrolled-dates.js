'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var hooks = require('@mantine/hooks');

function useUncontrolledDates({
  type,
  value,
  defaultValue,
  onChange
}) {
  return hooks.useUncontrolled({
    value,
    defaultValue,
    onChange,
    finalValue: type === "range" ? [null, null] : type === "multiple" ? [] : null
  });
}

exports.useUncontrolledDates = useUncontrolledDates;
//# sourceMappingURL=use-uncontrolled-dates.js.map
