import { ComponentType } from 'react';
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

import DateRangePickerModule from './components/DateRangePicker'
import DateRangePickerInputModule from './components/DateRangePickerInput'
// TypeScript imports
import {
  TimePickerInputProps, TimePickerProps
} from './interfaces/timepicker.interfaces'
import { MonthPickerProps } from './interfaces/monthpicker.interfaces'
import {
  DatePickerInputProps, DatePickerProps
} from './interfaces/datepicker.interfaces'
import {
  DateTimePickerInputProps,
  DateTimePickerProps
} from './interfaces/datetimepicker.interfaces'
import {
  DateRangePickerInputProps, DateRangePickerProps, 
  RangePickerInputProps, RangePickerProps
} from './interfaces/rangepicker.interfaces'


export const TimePicker:ComponentType<TimePickerProps> =
  StyleWrapper(TimePickerModule)
export const TimePickerInput:ComponentType<TimePickerInputProps> =
  StyleWrapper(TimePickerInputModule)

export const MonthPicker:ComponentType<MonthPickerProps> =
	StyleWrapper(MonthPickerModule)
export const DatePicker:ComponentType<DatePickerProps> =
  StyleWrapper(DatePickerModule)
export const DatePickerInput:ComponentType<DatePickerInputProps> =
  StyleWrapper(DatePickerInputModule)

export const DateTimePicker:ComponentType<DateTimePickerProps> =
  StyleWrapper(DateTimePickerModuel)
export const DateTimePickerInput:ComponentType<DateTimePickerInputProps> =
  StyleWrapper(DateTimePickerInputModuel)

export const DateTimeRangePicker:ComponentType<RangePickerProps> =
  StyleWrapper(RangePicker)
export const DateTimeRangePickerInput:ComponentType<RangePickerInputProps> =
  StyleWrapper(DateTimeRangePickerInputModule)

export const DateRangeCalendarPicker:ComponentType<DateRangePickerProps> =
  StyleWrapper(DateRangeCalendarPickerModule)
export const DateRangeCalendarPickerInput:ComponentType<DateRangePickerInputProps> =
  StyleWrapper(DateRangeCalendarPickerInputModule)

export const DateRangePicker:ComponentType<DateRangePickerProps> =
  StyleWrapper(DateRangePickerModule)
export const DateRangePickerInput:ComponentType<DateRangePickerInputProps> =
  StyleWrapper(DateRangePickerInputModule)