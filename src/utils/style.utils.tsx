import React from 'react'
import { assign } from 'lodash'
import { getThemeColors } from './style.theme'
// TypeScript imports
import { ComponentTheme } from '../interfaces/style.interfaces'
import {
  TimePickerInputProps, TimePickerProps
} from '../interfaces/timepicker.interfaces'
import { MonthPickerProps } from '../interfaces/monthpicker.interfaces'
import {
  DatePickerInputProps, DatePickerProps
} from '../interfaces/datepicker.interfaces'
import {
  DateTimePickerInputProps,
  DateTimePickerProps
} from '../interfaces/datetimepicker.interfaces'
import {
  DateRangePickerInputProps, DateRangePickerProps, 
  RangePickerInputProps, RangePickerProps
} from '../interfaces/rangepicker.interfaces'


type WrapperProps = 
  TimePickerInputProps |
  TimePickerProps |
  MonthPickerProps |
  DatePickerProps |
  DatePickerInputProps |
  DateTimePickerProps |
  DateTimePickerInputProps |
  RangePickerProps |
  RangePickerInputProps |
  DateRangePickerProps |
  DateRangePickerInputProps

/**
 * Wrapper component to all exported library components
 * 
 * Merge theme colors with prop colors or default colors
 * and create colors object to be used by all component
 */
 const StyleWrapper = <P extends WrapperProps>(
  WrappedComponent: React.ComponentType<P>
):React.FC<P & {colors: ComponentTheme, theme: string}> => ({
  colors, theme, ...otherProps
}) => {
    // override theme colors provided by props
    let themeColors = getThemeColors(theme)
    themeColors = assign(themeColors, colors)
    // pass-on other props with new colors
    const mergeProps = {...otherProps, colors: themeColors}

		return <WrappedComponent {...mergeProps as P} />
}

export default StyleWrapper