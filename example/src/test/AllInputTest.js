import React, { Component, useState } from 'react'

import { DatePicker,
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
    const [curr_date, setDate] = useState(new Date())

    const handleDateUpdate = ({ date }) => {
        setDate(date.date)
    }

    return (
        <DateTimePickerInput date={curr_date}
            inputComponent={<input className="gg" />}
            onDateTimeUpdate={handleDateUpdate}
            onDone={() => console.log('hehre')}
        />
    )
}

const DateRangePickerComponent = () => {
    const [from_date, setFromDate] = useState(new Date())
    const [to_date, setToDate] = useState(new Date())

    const handleFromDateUpdate = ({ date }) => {
        setFromDate(date)
    }

    const handleToDateUpdate = ({ date }) => {
        setToDate(date)
    }

    return (
        <DateRangePickerInput from_date={from_date} to_date={to_date}
            inputComponent={<input className="gg" />}
            onFromDateUpdate={handleFromDateUpdate}
            onToDateUpdate={handleToDateUpdate} />
    )
}

const DateRangeCalendarPickerComponent = () => {
    const [from_date, setFromDate] = useState(new Date())
    const [to_date, setToDate] = useState(new Date())

    const handleFromDateUpdate = ({ date }) => {
        setFromDate(date)
    }

    const handleToDateUpdate = ({ date }) => {
        setToDate(date)
    }

    return (
        <DateRangeCalendarPickerInput from_date={from_date} to_date={to_date}
            inputComponent={<input className="gg" />}
            onFromDateUpdate={handleFromDateUpdate}
            onToDateUpdate={handleToDateUpdate} />
    )
}

const DateTimeRangePickerComponent = () => {
    const [from_date, setFromDate] = useState(new Date())
    const [to_date, setToDate] = useState(new Date())

    const handleFromDateUpdate = ({ date }) => {
        setFromDate(date.date)
    }

    const handleToDateUpdate = ({ date }) => {
        setToDate(date.date)
    }

    return (
        <DateTimeRangePickerInput from_date={from_date} to_date={to_date}
            inputComponent={<input className="gg" />}
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
                        <DatePickerComponent />
                    </div>
                </div>

            </div>
        )
    }
}
