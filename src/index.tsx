import StyleWrapper from './style.utils'

import TimePickerModule from "./timepicker/TimePicker";
import MonthPickerModule from "./monthpicker/MonthPicker";

import DatePickerModule from "./datepicker/DatePicker";
import DatePickerInputModule from "./datepicker/DatePickerInput";

import DateTimePickerModuel from "./datetimepicker/DateTimePicker";
import DateTimePickerInputModuel from "./datetimepicker/DateTimePickerInput";

import RangePicker from "./rangepicker/RangePicker";
import DateTimeRangePickerInputModule from "./rangepicker/RangePickerInput"


export const TimePicker = StyleWrapper(TimePickerModule)
export const MonthPicker = StyleWrapper(MonthPickerModule)

export const DatePicker = StyleWrapper(DatePickerModule)
export const DatePickerInput = StyleWrapper(DatePickerInputModule)

export const DateTimePicker = StyleWrapper(DateTimePickerModuel)
export const DateTimePickerInput = StyleWrapper(DateTimePickerInputModuel)

export const DateTimeRangePicker = StyleWrapper(RangePicker)
export const DateTimeRangePickerInput = StyleWrapper(DateTimeRangePickerInputModule)