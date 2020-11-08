import StyleWrapper from './utils/style.utils';

import TimePickerModule from "./components/TimePicker";
import TimePickerInputModule from "./components/TimePickerInput";
import MonthPickerModule from "./components/MonthPicker";

import DatePickerModule from "./components/DatePicker";
import DatePickerInputModule from "./components/DatePickerInput";

import DateTimePickerModuel from "./components/DateTimePicker";
import DateTimePickerInputModuel from "./components/DateTimePickerInput";

import RangePicker from "./components/RangePicker";
import DateTimeRangePickerInputModule from "./components/RangePickerInput";

import DateRangeCalendarPickerModule from "./components/DateRangeCalendarPicker";
import DateRangeCalendarPickerInputModule from "./components/DateRangeCalendarPickerInput";


export const TimePicker = StyleWrapper(TimePickerModule)
export const TimePickerInput = StyleWrapper(TimePickerInputModule)

export const MonthPicker = StyleWrapper(MonthPickerModule)
export const DatePicker = StyleWrapper(DatePickerModule)
export const DatePickerInput = StyleWrapper(DatePickerInputModule)

export const DateTimePicker = StyleWrapper(DateTimePickerModuel)
export const DateTimePickerInput = StyleWrapper(DateTimePickerInputModuel)

export const DateTimeRangePicker = StyleWrapper(RangePicker)
export const DateTimeRangePickerInput = StyleWrapper(DateTimeRangePickerInputModule)

export const DateRangeCalendarPicker = StyleWrapper(DateRangeCalendarPickerModule)
export const DateRangeCalendarPickerInput = StyleWrapper(DateRangeCalendarPickerInputModule)