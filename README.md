# react-datetime-range-super-picker

###### React date, time, date-time range, calender, clock and even month i.e. all in one picker !!

###### This is a _super_ picker due to how it handles date-time props for each components. This component permenantly solves the time handling issue where you get certain format of Date as an input and you have to return completely different format after user edit. Not to forget it does it while looking extremely cool ! 

###### There are lot of Date Range pickers but most of them do not handle _Date-TIME_ Range picking

[![NPM](https://img.shields.io/npm/v/react-datetime-range-super-picker.svg)](https://www.npmjs.com/package/react-datetime-range-super-picker) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

Install using npm simply (If you can just get that long name right...)

```bash
npm install --save react-datetime-range-super-picker
```

if you are using yarn

```bash
yarn add react-datetime-range-super-picker
```

Amazing demo just for you ---> [Checkout Demo](https://dishant15.github.io/react-datetime-range-super-picker/)

## Table of Contents
- Components
  - [TimePicker](#TimePicker)
  - [DatePicker](#DatePicker)
  - [MonthPicker](#MonthPicker)
  - [DateTimePicker](#DateTimePicker)
  - [DateTimeRangePicker](#DateTimeRangePicker)
- [Styling](#Styling)

---

## TimePicker

```tsx
import React, {useState} from 'react'

import { TimePicker } from 'react-datetime-range-super-picker'
import 'react-datetime-range-super-picker/dist/index.css'


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
```

Available Props

| **Props** | **Default** | **Type** | **Description** |
| :--- |:--- | :---:| :--- |
| time | { hour: 8, minute: 0, meridiem: 'AM' } | Object or String | Example <br><ul><li>{ hour: 8, minute: 0, meridiem: 'AM' }</li><li>{ hour24: 16, minute: 0 }</li><li>"16:30"</li><li>"8:30 AM"</li></ul>|
| onTimeUpdate | -- | Function | Returns <br>{ hour24, hour, minute, meridiem }|


## DatePicker

```tsx
import React, {useState} from 'react'

import { DatePicker } from 'react-datetime-range-super-picker'
import 'react-datetime-range-super-picker/dist/index.css'


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
```

Available Props

| **Props** | **Default** | **Type** | **Description** |
| :--- |:--- | :---:| :--- |
| date | new Date() | Date Object,<br> Object or <br> String | Example <br><ul><li>new Date()</li><li>{ day : number, month : number, year : number }</li><li>"1st january 2020"</li></ul>|
| weekStartsOn | 0 | Number | where 0 - sunday and 6 - saturday |
| format | do MMMM yyyy | String | More format supported [date-fns](https://date-fns.org/v2.14.0/docs/format)|
| onDateUpdate | -- | Function | Returns <br>{ day, month, year, date, formatted } |
| onComplete | -- | Function | () => void |


## DatePickerInput

```tsx
import React, {useState} from 'react'

import { DatePickerInput } from 'react-datetime-range-super-picker'
import 'react-datetime-range-super-picker/dist/index.css'


const DatePickerInputWrapper = () => {

  const [res_day, setDay] = useState(10)
  const [res_month, setMonth] = useState(1)
  const [res_year, setYear] = useState(2020)

  const handleDateUpdate = ({month, year, day}) => {
    setMonth(month) setYear(year) setDay(day)
  }
  
  return (
    <DatePickerInput 
      date={{day:res_day, month: res_month, year:res_year}}
      onDateUpdate={handleDateUpdate} />
  )
}
```

Additional Props

All [DatePicker](#DatePicker) props are inherited

| **Props** | **Default** | **Type** | **Description** |
| :--- |:--- | :---:| :--- |
| inputStyle |  | css style | |
| popupStyle |  | css style | |
| className |  | String | |
| popupClassName |  | String | | |

## MonthPicker

```tsx
import React, {useState} from 'react'

import { MonthPicker } from 'react-datetime-range-super-picker'
import 'react-datetime-range-super-picker/dist/index.css'


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

Available Props

| **Props** | **Default** | **Type** | **Description** |
| :--- |:--- | :---:| :--- |
| time | new Date() | Date Object<br> or Object | Example <br><ul><li>new Date()</li><li>{ month : number, year : number }</li></ul> |
| onDateUpdate | -- | Function | Returns <br>{ month, year } |


## DateTimePicker

```tsx
import React, {useState} from 'react'

import { DateTimePicker } from 'react-datetime-range-super-picker'
import 'react-datetime-range-super-picker/dist/index.css'


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
```

Available Props

| **Props** | **Default** | **Type** | **Description** |
| :--- |:--- | :---:| :--- |
| date | new Date() | Date Object,<br> Object or <br> String | Example <br><ul><li>new Date()</li><li>{ day : number, month : number, year : number }</li><li>"1st january 2020"</li></ul>|
| format | dd/MM/YYY hh:mm aaa | String | More format supported [date-fns](https://date-fns.org/v2.14.0/docs/format)|
| timeFormat |  | String | More format supported [date-fns](https://date-fns.org/v2.14.0/docs/format)|
| dateFormat |  | String | More format supported [date-fns](https://date-fns.org/v2.14.0/docs/format)|
| weekStartsOn | 0 | Number | where 0 - sunday and 6 - saturday |
| onDateTimeUpdate | -- | Function | Returns <br>{ date: { day, month, year, hour , hour24, minute, meridem }, formatted } |
| onDateUpdate | -- | Function | Returns <br>{ day, month, year, date, formatted } |
| onTimeUpdate | -- | Function | Returns <br>{ time: { hour, hour24, minute, meridiem }, formatted } |


## DateTimePickerInput

```tsx
import React, {useState} from 'react'

import { DateTimePickerInput } from 'react-datetime-range-super-picker'
import 'react-datetime-range-super-picker/dist/index.css'


const DateTimePickerInputWrapper = () => {

  const [date, setDate] = useState(new Date())

  const handleFullDateTimeUpdate = (args) => {
    setDate(args.date.date)
  }
  
  return (
    <DateTimePickerInput date={date}
      onDateTimeUpdate={handleFullDateTimeUpdate} />
  )
}
```

Additional Props

All [DateTimePicker](#DateTimePicker) props are inherited

| **Props** | **Default** | **Type** | **Description** |
| :--- |:--- | :---:| :--- |
| inputStyle |  | css style | |
| popupStyle |  | css style | |
| className |  | String | |
| popupClassName |  | String | | |


## DateTimeRangePicker

```tsx
import React, {useState} from 'react'

import { DateTimeRangePicker } from 'react-datetime-range-super-picker'
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
```

Available Props

| **Props** | **Default** | **Type** | **Description** |
| :--- |:--- | :---:| :--- |
| from_date,<br/>to_date | new Date() | Date Object,<br> Object or <br> String | Example <br><ul><li>new Date()</li><li>{ day : number, month : number, year : number }</li><li>"1st january 2020"</li></ul>|
| format | dd/MM/YYY hh:mm aaa | String | More format supported [date-fns](https://date-fns.org/v2.14.0/docs/format)|
| timeFormat |  | String | More format supported [date-fns](https://date-fns.org/v2.14.0/docs/format)|
| dateFormat |  | String | More format supported [date-fns](https://date-fns.org/v2.14.0/docs/format)|
| weekStartsOn | 0 | Number | where 0 - sunday and 6 - saturday |
| onFromDateTimeUpdate,<br/>onToDateTimeUpdate | -- | Function | Returns <br>{ date: { day, month, year, hour , hour24, minute, meridem }, formatted } |
| onFromDateUpdate,<br/>onToDateUpdate | -- | Function | Returns <br>{ day, month, year, date, formatted } |
| onFromTimeUpdate,<br/>onToTimeUpdate | -- | Function | Returns <br>{ time: { hour, hour24, minute, meridiem }, formatted } |
| onDone | -- | Function | () => void |


## DateTimeRangePickerInput

```tsx
import React, {useState} from 'react'

import { DateTimeRangePickerInput } from 'react-datetime-range-super-picker'
import 'react-datetime-range-super-picker/dist/index.css'


const DateTimeRangePickerInputWrapper = () => {

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
    <DateTimeRangePickerInput from_date={from_date} to_date={to_date}
      onFromDateTimeUpdate={handleFromDateUpdate} 
      onToDateTimeUpdate={handleToDateUpdate} />
  )
}
```

Additional Props

All [DateTimeRangePickerInput](#DateTimeRangePickerInput) props are inherited

| **Props** | **Default** | **Type** | **Description** |
| :--- |:--- | :---:| :--- |
| inputStyle |  | css style | |
| popupStyle |  | css style | |
| className |  | String | |
| popupClassName |  | String | | |


## Styling

common props for all component

| **Props** | **Type** | **Description** |
| :--- | :---:| :--- |
| theme | String | light or dark <br/> Default is light |
| colors | Object | {<br/>primary_color,<br/>primary_font_color,<br/>light_font_color,<br/>secondary_color,<br/>primary_highlight_color,<br/>secondary_highlight_color<br/>}| |

---

## License

MIT © [Dishant15](https://github.com/Dishant15)