# react-datetime-range-super-picker

> React date, time, date range, calender, clock i.e. all in one picker

[![NPM](https://img.shields.io/npm/v/react-datetime-range-super-picker.svg)](https://www.npmjs.com/package/react-datetime-range-super-picker) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-datetime-range-super-picker
```

if you are using yarn

 ```bash
yarn add react-datetime-range-super-picker
```

[Demo](https://dishant15.github.io/react-datetime-range-super-picker/)

## Usage

```tsx
import React, {useState} from 'react'

import { TimePicker, 
  DatePicker, MonthPicker,
  DateTimePicker,
  DateTimeRangePicker
} from 'react-datetime-range-super-picker'
import 'react-datetime-range-super-picker/dist/index.css'

const DateTimeRangePickerWrapper = () => {

  const [from_date, setFromDate] = useState(new Date())
  const [to_date, setToDate] = useState(new Date())
  // OR use JSON object with : day, month, year

  const handleFromDateUpdate = ({date}) => {
    setFromDate(date.date)
  }
  const handleToDateUpdate = ({date}) => {
    setToDate(date.date)
  }
  
  return (
    <DateTimeRangePicker from_date={from_date} to_date={to_date}
      onFromDateTimeUpdate={handleFromDateUpdate} 
      onToDateTimeUpdate={handleToDateUpdate} />
  )
}


const DateTimePickerWrapper = () => {

  const [curr_date, setDate] = useState(new Date())
  // OR use JSON object with : day, month, year

  const handleDateUpdate = ({date}) => {
    setDate(date.date)
  }
  
  return (
    <DateTimePicker date={curr_date}
      onDateTimeUpdate={handleDateUpdate} />
  )
}


const TimePickerWrapper = () => {

  const [hour24, setHour] = useState(22)
  const [minute, setMin] = useState(30)
  // OR use hour (12 hour format), minute and meridian (AM | PM) for props
  // OR for string time use : "HH:mm" ( 24 hrs ) | "hh:mm aa" ( 12 hrs )

  const handleTimeUpdate = ({time}) => {
    setHour(time.hour24)
    setMin(time.minute)
  }

  return (
    <TimePicker time={{hour24, minute }} 
      onTimeUpdate={handleTimeUpdate} />
  )
}


const DatePickerWrapper = () => {

  const [curr_date, setDate] = useState(new Date())
  // OR use JSON object with : day, month, year

  const handleDateUpdate = ({date}) => {
    setDate(date)
  }
  
  return (
    <DatePicker weekStartsOn={0} 
      date={curr_date}
      onDateUpdate={handleDateUpdate} />
  )
}


const MonthPickerWrapper = () => {

  const [res_month, setMonth] = useState(4)
  const [res_year, setYear] = useState(2020)
  // OR use Date object as input

  const handleUpdate = ({month, year}) => {
    setMonth(month)
    setYear(year)
  }
  
  return (
    <MonthPicker time={{month: res_month, year:res_year}}
      onDateUpdate={handleUpdate} />
  )
}
```

## License

MIT © [Dishant15](https://github.com/Dishant15)
