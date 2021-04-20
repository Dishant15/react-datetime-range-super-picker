import React, { Component, useState } from 'react'

import { DateTimeRangePicker,
    TimePickerInput, DatePickerInput, MonthPicker,
    DateRangePickerInput, DateTimePickerInput,
    DateRangeCalendarPickerInput, DateTimeRangePickerInput
} from 'react-datetime-range-super-picker';

import 'react-datetime-range-super-picker/dist/index.css'


const TimePickerComponent = () => {
    const [hour, setHour] = useState('PM')
    const [minute, setMin] = useState()

    const handleTimeUpdate = (timeObj) => {
        setHour(timeObj.time.hour24)
        setMin(timeObj.time.minute)
        // setHour(timeObj.formatted)
    }

    return (
        <TimePickerInput time={{hour24: hour, minute}}
            onTimeUpdate={handleTimeUpdate} />
    )
}

const DatePickerComponent = () => {
    const [curr_date, setDate] = useState()

    const handleDateUpdate = (dateObj) => {
        setDate(dateObj.date)
    }

    return (
        <>
        <DatePickerInput date={curr_date}
            onDateUpdate={handleDateUpdate} />
            <button onClick={() => setDate(null)}>Clear Date</button>
        </>
    )
}

const MonthPickerComponent = () => {
    const [res_month, setMonth] = useState(4)
    const [res_year, setYear] = useState(2020)

    const handleDateUpdate = ({ month, year }) => {
        setMonth(month)
        setYear(year)
    }

    return (
        <MonthPicker time={{ month: res_month, year: res_year }}
            onDateUpdate={handleDateUpdate} />
    )
}

const DateTimePickerComponent = () => {
    const [curr_date, setDate] = useState()

    const handleDateUpdate = (ip) => {
    console.log("🚀 ~ file: AllInputTest.js ~ line 63 ~ handleDateUpdate ~ ip", ip)
        setDate(ip.formatted)
    }

    return (
        <DateTimePickerInput date={curr_date}
            onDateTimeUpdate={handleDateUpdate}
            onDone={() => console.log('hehre')}
        />
    )
}

const DateRangePickerComponent = () => {
    const [from_date, setFromDate] = useState()
    const [to_date, setToDate] = useState()

    const handleFromDateUpdate = ({ date }) => {
        setFromDate(date)
    }

    const handleToDateUpdate = ({ date }) => {
        setToDate(date)
    }

    return (
        <DateRangePickerInput from_date={from_date} to_date={to_date}
            onFromDateUpdate={handleFromDateUpdate}
            onToDateUpdate={handleToDateUpdate} />
    )
}

const DateRangeCalendarPickerComponent = () => {
    const [from_date, setFromDate] = useState()
    const [to_date, setToDate] = useState()

    const handleFromDateUpdate = ({ date }) => {
        setFromDate(date)
    }

    const handleToDateUpdate = ({ date }) => {
        setToDate(date)
    }

    return (
        <DateRangeCalendarPickerInput from_date={from_date} to_date={to_date}
            onFromDateUpdate={handleFromDateUpdate}
            onToDateUpdate={handleToDateUpdate} />
    )
}

const DateTimeRangePickerComponent = () => {
    const [from_date, setFromDate] = useState()
    const [to_date, setToDate] = useState()

    const handleFromDateUpdate = ({ date }) => {
        setFromDate(date.date)
    }

    const handleToDateUpdate = ({ date }) => {
        setToDate(date.date)
    }

    return (
        <DateTimeRangePickerInput from_date={from_date} to_date={to_date}
            onFromDateTimeUpdate={handleFromDateUpdate}
            onToDateTimeUpdate={handleToDateUpdate}
        />
    )
}

export default class AllInputTest extends Component {
    render = () => {
        return (
            <div className="container">

                <div className="row">
                    <div className="col s4">
                        <h6>Time picker</h6>
                        <DateTimeRangePickerComponent />
                    </div>
                </div>

            </div>
        )
    }
}
