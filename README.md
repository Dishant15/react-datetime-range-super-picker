# react-datetime-range-super-picker

###### React date, time, date-time range, calender, clock and even month i.e. all in one picker !!

###### This is a _super_ picker due to how it handles date-time props for each components. This component permenantly solves the time handling issue where you get certain format of Date as an input and you have to return completely different format after user edit. Not to forget it does it while looking extremely cool ! 

###### There are lot of Date Range pickers but most of them do not handle _Date-TIME_ Range picking

Amazing demo just for you ---> [Checkout Demo](https://dishant15.github.io/react-datetime-range-super-picker/)

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

## Table of Contents
- Components
  - [TimePicker](#TimePicker)
  - [DatePicker](#DatePicker)
  - [DateTimePicker](#DateTimePicker)
  - [DateTimeRangePicker](#DateTimeRangePicker)
  - [MonthPicker](#MonthPicker)
- [Input Components](#InputComponents)
- [Styling](#Styling)
- [Future Updates](#FutureUpdates)
- [Contributors](#Contributors)

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

**Available Props:**

| **Props** | **Type** | **Description** |
| :--- | :---:| :--- |
| time | <ul><li>Object</li> <li>String</li></ul> | Default value: "08:00 am"<br>Time can be Json object, which can be either 12hr OR 24hr format.<br>While using string time, format is hh:mm aaa (12 hr) OR HH:mm (24hr)<br>Examples :<ul><li>12 hour format : { hour: 8, minute: 0, meridiem: 'AM' }</li><li>24 hour format : { hour24: 16, minute: 0 }</li><li>"16:30"</li><li>"08:30 AM"</li></ul>|
| format (Optional) | String | Default value: **'hh:mm aaa'** <br>choose format of time returned and shown on picker |
| onTimeUpdate | Function | This function will be called every time user changes time.<br>Handler Arguments :{ { hour24, hour, minute, meridiem }, formatted}<br>formatted will be time as per selected format |

Supports Input component : TimePickerInput . [Checkout further details](#InputComponents)

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

**Available Props:**

| **Props** | **Type** | **Description** |
| :--- | :---:| :--- |
| date | <ul><li>Date Object</li><li>Json Object</li><li>String</li></ul> | Different types of input this prop can handle : <br><ul><li>JS Date object : new Date()</li><li>Json Object :{ day : number, month : number, year : number }</li><li>String : "1st january 2020"; string format needs to be same as format prop</li></ul>|
| weekStartsOn | Number | Default value: 0 (Sunday)<br> 0 = sunday -> 6 = saturday<br>Updates calender date ordering |
| format | String | Default value : "do MMMM yyyy"<br> checkout all supported formats at [date-fns](https://date-fns.org/v2.14.0/docs/format)|
| onDateUpdate | Function | Every time user changes date, month or year this function will be called with following Json object as an argument: <br>{ day, month, year, date, formatted } |
| onComplete | Function | Once user selects a date this handler is called. Can be used to hide picker on date select |

Supports Input component : DatePickerInput . [Checkout further details](#InputComponents)

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

**Available Props:**

| **Props** | **Type** | **Description** |
| :--- | :---:| :--- |
| date | <ul><li>Date Object</li><li>Json Object</li><li>String</li></ul> | Different types of input this prop can handle : <br><ul><li>JS Date object : new Date()</li><li>Json Object :{ day, month, year, hour? , hour24?, minute?, meridiem?}; use hour(12 hr format) with meridiem, OR hour24 and minute only for time </li><li>String : "1st january 2020 12:30 PM"; string format needs to be same as format prop</li></ul>|
| format (optional) | String | Select input and output string format of the picker.<br> Default value : "dd/MM/YYY hh:mm aaa" More format supported [date-fns](https://date-fns.org/v2.14.0/docs/format)|
| timeFormat (optional) | String | Select time picker specific format. More format supported [date-fns](https://date-fns.org/v2.14.0/docs/format)|
| dateFormat (optional) | String | Select date picker specific format. More format supported [date-fns](https://date-fns.org/v2.14.0/docs/format)|
| weekStartsOn (optional) | Number | Default value: 0 (Sunday)<br> 0 = sunday -> 6 = saturday<br>Updates calender date ordering |
| onDateTimeUpdate | Function | Every time user changes **date** or **time** this handler will be called. <br>Arguments for the handlers : { date: { day, month, year, hour , hour24, minute, meridiem }, formatted } |
| onDateUpdate (optional) | Function | Every time user changes **date** this handler will be called.<br>Arguments for the handlers : { day, month, year, date, formatted } |
| onTimeUpdate (optional) | Function | Every time user changes **time** this handler will be called.<br>Arguments for the handlers : { time: { hour, hour24, minute, meridiem }, formatted } |

Supports Input component : DateTimePickerInput . [Checkout further details](#InputComponents)

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

**Available Props:**

| **Props** | **Type** | **Description** |
| :--- |:---:| :--- |
| from_date,<br/>to_date | <ul><li>Date Object</li><li>Json Object</li><li>String</li></ul> | Different types of input this prop can handle : <br><ul><li>JS Date object : new Date()</li><li>Json Object :{ day, month, year, hour? , hour24?, minute?, meridiem?}; use hour(12 hr format) with meridiem, OR hour24 and minute only for time </li><li>String : "1st january 2020 12:30 PM"; string format needs to be same as format prop</li></ul>|
| format | String | Default value : "dd/MM/YYY hh:mm aaa". More format supported [date-fns](https://date-fns.org/v2.14.0/docs/format)|
| timeFormat | String | More format supported [date-fns](https://date-fns.org/v2.14.0/docs/format)|
| dateFormat | String | More format supported [date-fns](https://date-fns.org/v2.14.0/docs/format)|
| weekStartsOn | Number | Default value: 0 (Sunday)<br> 0 = sunday -> 6 = saturday<br>Updates calender date ordering |
| onFromDateTimeUpdate,<br/>onToDateTimeUpdate | Function | Every time user changes **date** or **time** this handler will be called<br> Arguments for the handlers : { date: { day, month, year, hour , hour24, minute, meridiem }, formatted } |
| onFromDateUpdate,<br/>onToDateUpdate<br/>(optional) | Function | Every time user changes **date** this handler will be called.<br>Arguments for the handlers : { day, month, year, date, formatted } |
| onFromTimeUpdate,<br/>onToTimeUpdate<br/>(optional) | Function | Every time user changes **time** this handler will be called.<br>Arguments for the handlers : { time: { hour, hour24, minute, meridiem }, formatted } |
| onDone (optional) | Function | If this function is passed as a prop, picker will show a done/close button and call this handler when user clicks it. Can be used to easily handle picker hide state. |

Supports Input component : DateTimeRangePickerInput . [Checkout further details](#InputComponents)

## MonthPicker

###### Bonus Month picker! Useful when you want to pick just month and year in a cool way.

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

**Available Props:**

| **Props** | **Type** | **Description** |
| :--- | :---:| :--- |
| time | Date OR Object | Example <br><ul><li>new Date()</li><li>{ month : number, year : number }</li></ul> |
| onDateUpdate | Function | Returns <br>{ month, year } |


## InputComponents

Input components are wrapper around their picker components. They handle show / hide states and logic internally.
If you want to show a simple form input box, which will show or hide Picker component as per user interaction than use Input components.
List of Input Components : TimePickerInput, DatePickerInput, DateTimePickerInput, DateTimeRangePickerInput.

Here is an example code for DateTimeRangePickerInput component.

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

Every Input component takes the same **props** as simple picker component.
In addition it provides extra props for styling. Which are as listed below.

| **Props** | **Description** |
| :--- | :--- |
| inputStyle | Pass styles directly to text box input component as Json object. Follows same rules as React style object. |
| popupStyle | Pass styles directly to picker popup wrapper component as Json object. Can be used to position, resize wrapper. Follows same rules as React style object. |
| className | String, css class to be used apply additional style to text box with raw css |
| popupClassName | String, css class to be used apply additional style to picker popup with raw css |

Note : All of above props are optional.


## Styling

Every picker component color scheme can be changed with 2 props: **theme** and **colors**.
Currently all picker supports few themes out of the box as shown in props table below. (More themes coming soon !!)
Theme is created using colors listed in props table below.

There are 3 easy ways to customise color scheme to suit your requirements:
1. Use theme prop if that matches your needs.
2. Use all the colors and customise whole picker look.
3. Use theme prop and override just the colors you want to change in that theme. i.e. choose "dark" _theme_ and just override _primary color_

| **Props** | **Type** | **Description** |
| :--- | :---:| :--- |
| theme | String | **light**, **dark**, **colorful** <br/> Default is light |
| colors | Json Object | Json object keys :<br/> <ul><li>primary_color</li> <li>primary_font_color</li> <li>light_font_color</li> <li>secondary_color</li> <li>primary_highlight_color</li> <li>secondary_highlight_color</li></ul> |

**All styling props above are optional**


## FutureUpdates

###### Things that this date time range super picker library does not do (YET). 
###### We are open to suggestions. Open an issue with your ideas, if we like it and it is really useful ( or just cool ) we will implement it in next release !

* Filter props to handle disable / enable pickable dates
* Time duration component with range picker
* "Last X days/hours" dynamic selector for range picker


## Contributors

- [Dishant Chavda](https://github.com/Dishant15) : Creator
- [Harsh Darji](https://github.com/hARSHVDARJI) : Contributions with styling updates and setting up the demo

---

## License

MIT © [Dishant15](https://github.com/Dishant15)
