# react-datetime-range-super-picker

> React date, time, date range, calender, clock i.e. all in one picker

[![NPM](https://img.shields.io/npm/v/react-datetime-range-super-picker.svg)](https://www.npmjs.com/package/react-datetime-range-super-picker) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-datetime-range-super-picker
```

[Demo](https://dishant15.github.io/react-datetime-range-super-picker/)

## Usage

```tsx
import React, { Component } from 'react'

import { TimePicker, MonthPicker } from 'react-datetime-range-super-picker'
import 'react-datetime-range-super-picker/dist/index.css'

class Example extends Component {
  render() {
    return (
      <TimePicker time="08:30 am" 
        onTimeUpdate={(time) => console.log(time)} />

      <MonthPicker month={10} year={1991}
        onTimeUpdate={(time) => console.log(time)} />
    )
  }
}
```

## License

MIT © [Dishant15](https://github.com/Dishant15)
