import StyleWrapper from './style.utils'

import TimePickerModule from "./components/TimePicker";
import MonthPickerModule from "./components/MonthPicker";

import DatePickerModule from "./components/DatePicker";
import DatePickerInputModule from "./components/DatePickerInput";

import DateTimePickerModuel from "./components/DateTimePicker";
import DateTimePickerInputModuel from "./components/DateTimePickerInput";

import RangePicker from "./components/RangePicker";
import DateTimeRangePickerInputModule from "./components/RangePickerInput"


export const TimePicker = StyleWrapper(TimePickerModule)
export const MonthPicker = StyleWrapper(MonthPickerModule)

export const DatePicker = StyleWrapper(DatePickerModule)
export const DatePickerInput = StyleWrapper(DatePickerInputModule)

export const DateTimePicker = StyleWrapper(DateTimePickerModuel)
export const DateTimePickerInput = StyleWrapper(DateTimePickerInputModuel)

export const DateTimeRangePicker = StyleWrapper(RangePicker)
export const DateTimeRangePickerInput = StyleWrapper(DateTimeRangePickerInputModule)