import React, { useCallback, useState } from "react";
import { isEmpty, isNaN, padStart } from 'lodash'

import ClockFace from './ClockFace'

import { createInputTime, generateTimeOutput } from "../utils/timepicker.utils";

import {
  TimeTitleWrapperProps,
  TimePickerProps,
  MainTime,
  defaultConfigs
} from "../interfaces/timepicker.interfaces";

import { getSetButtonStyles } from '../styles/monthpicker.colors'
import styles from '../styles/timepicker.css'


export default ({
  time, format = defaultConfigs.format,
  colors,
  onTimeUpdate
}: TimePickerProps) => {
  const curr_time = createInputTime(time)

  const handleTimeChange = useCallback((newTime: MainTime) => {
    let resTime = generateTimeOutput(newTime, format)
    if (!resTime.formatted) {
      // formatted string is empty even after user clicked smt
      if (!isNaN(Number(resTime.time.minute))) {
        // @ts-ignore; user clicked minute so default hour to 0 and add mins
        resTime.formatted = `00:${padStart(resTime.time.minute, 2, '0')} AM`
      }
      else if (!isNaN(Number(resTime.time.hour))) {
        // @ts-ignore; user clicked hour so default min to 0 and add hour
        resTime.formatted = `${padStart(resTime.time.hour, 2, '0')}:00 AM`
      }
      else if (resTime.time.meridiem === 'PM') {
        // user Clicked on PM btn
        resTime.formatted = '00:00 PM'
      }
    }
    onTimeUpdate(resTime)
  }, [])


  const wrapper_style = {
    background: colors.primary_color,
    color: colors.primary_font_color
  }

  return (
    <div className={styles.wrapper} style={wrapper_style}>

      <TimeTitleWrapper {...curr_time}
        time_format={format}
        colors={colors}
        onTimeUpdate={handleTimeChange}
      />

      <ClockFace {...curr_time}
        colors={colors}
        onTimeUpdate={handleTimeChange} />
    </div>
  )
}


const TimeTitleWrapper = ({
  hour, minute, meridiem, time_format, colors, onTimeUpdate
}: TimeTitleWrapperProps) => {
  const [edit, setEdit] = useState(false)
  const [resHour, setHour] = useState(hour)
  const [resMinute, setMinute] = useState(minute)
  const [resMeridiem, setMeridiem] = useState(meridiem)
  const [errors, setErrors] = useState({}) // { hour: false, min: false }

  const { formatted } = generateTimeOutput({ hour, minute, meridiem }, time_format)

  const handleHourChange = useCallback((e) => {
    setHour(e.target.value)
  }, [])

  const handleMinuteChange = useCallback((e) => {
    setMinute(e.target.value)
  }, [])

  const handleMeridiemChange = useCallback((e) => {
    setMeridiem(e.target.value)
  }, [])

  const handleTimeChange = useCallback(() => {
    let errors = {}
    if (!validHour(String(resHour))) errors['hour'] = true
    if (!validMinute(String(resMinute))) errors['min'] = true
    if (!isEmpty(errors)) {
      // error in input
      setErrors(errors)
      return
    }
    // update data
    onTimeUpdate({
      hour: Number(resHour),
      minute: Number(resMinute),
      meridiem: resMeridiem
    })
    setErrors({})
    setEdit(false)
  }, [resHour, resMinute, resMeridiem])

  if (edit) {
    return (
      <div className={styles.time_edit}>
        <input type="number" placeholder="HH"
          value={resHour} className={getInputClass('hour', errors)}
          onChange={handleHourChange} />
        <div className={styles.time_edit_colon}>:</div>
        <input type="number" placeholder="MM"
          value={resMinute} className={getInputClass('min', errors)}
          onChange={handleMinuteChange} />
        <select defaultValue={resMeridiem}
          className={[styles.time_edit_input, styles.time_edit_select].join(' ')}
          onChange={handleMeridiemChange}>
          <option value="AM" >AM</option>
          <option value="PM" >PM</option>
        </select>
        <div className={styles.time_edit_submit}
          style={getSetButtonStyles(colors)}
          onClick={handleTimeChange}>
          Set
        </div>
      </div>
    )
  }
  return (
    <div className={styles.title}
      style={{ color: colors.primary_highlight_color }}
      onClick={() => setEdit(true)}>
      {formatted || '-- : -- AM'}
    </div>
  )
}

// update input class based on field error
const getInputClass = (
  fieldName: string,
  errors: {
    hour?: boolean,
    min?: boolean
  }) => {
  return [
    styles.time_edit_input,
    errors[fieldName] && styles.time_edit_input_error
  ].join(' ')
}

// validate hour
const validHour = (hour: string): boolean => {
  // empty string handle
  if (!!hour.trim()) {
    // number validation
    let newHour = Number(hour)
    return !isNaN(newHour) && newHour <= 12 && newHour > 0
  } else {
    return false
  }
}

// validate minute
const validMinute = (minute: string): boolean => {
  // empty string handle
  if (!!minute.trim()) {
    // number validation
    let newMinute = Number(minute)
    return !isNaN(newMinute) && newMinute < 60 && newMinute >= 0
  } else {
    return false
  }
}
