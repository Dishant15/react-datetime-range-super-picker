import React, { Component, useState } from 'react'

import {
    TimePickerInput, DatePickerInput, MonthPicker,
    DateRangePickerInput, DateTimePickerInput,
    DateRangeCalendarPickerInput, DateTimeRangePickerInput
} from 'react-datetime-range-super-picker';

import 'react-datetime-range-super-picker/dist/index.css'

const TimePickerComponent = () => {
    const [hour, setHour] = useState(22)
    const [minute, setMin] = useState(30)

    const handleTimeUpdate = ({ time }) => {
        setHour(time.hour24)
        setMin(time.minute)
    }

    return (
        <TimePickerInput time={{ hour24: hour, minute }}
            onTimeUpdate={handleTimeUpdate} />
    )
}

const DatePickerComponent = () => {
    const [curr_date, setDate] = useState(new Date())

    const handleDateUpdate = ({ date }) => {
        setDate(date)
    }

    return (
        <DatePickerInput date={curr_date}
            onDateUpdate={handleDateUpdate} />
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
            onDateTimeUpdate={handleDateUpdate} />
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
            onFromDateUpdate={handleFromDateUpdate}
            onToDateUpdate={handleToDateUpdate} />
    )
}

const DateRangeCalendarPickerComponent = () => {
    const [from_date, setFromDate] = useState(new Date())
    const [to_date, setToDate] = useState(new Date())

    const handleFromDateUpdate = ({date}) => {
        setFromDate(date)
    }

    const handleToDateUpdate = ({date}) => {
        setToDate(date)
    }

    return (
        <DateRangeCalendarPickerInput from_date={from_date} to_date={to_date}
            onFromDateUpdate={handleFromDateUpdate} 
            onToDateUpdate={handleToDateUpdate} />
    )
}

const DateTimeRangePickerComponent = () => {
    const [from_date, setFromDate] = useState(new Date())
    const [to_date, setToDate] = useState(new Date())

    const handleFromDateUpdate = ({date}) => {
        setFromDate(date.date)
    }

    const handleToDateUpdate = ({date}) => {
        setToDate(date.date)
    }

    return (
        <DateTimeRangePickerInput from_date={from_date} to_date={to_date}
            renderInput={(props) => {
                return <input {...props}/>
            }}
            onFromDateTimeUpdate={handleFromDateUpdate} 
            onToDateTimeUpdate={handleToDateUpdate} />
    )
}

export default class AllInputTest extends Component {
    render = () => {
        return (
            <div className="container">

                {/* <div className="row">
                    <div className="col s4">
                        <h6>Time picker</h6>
                        <TimePickerComponent />
                    </div>
                    <div className="col s4">
                        <h6>Date picker</h6>
                        <DatePickerComponent />
                    </div>
                    <div className="col s4">
                        <h6>Month picker</h6>
                        <MonthPickerComponent />
                    </div>
                </div>

                <br /><hr /><br /> */}

                {/* <div className="row">
                    <div className="col s6">
                        <h6>Date Time picker</h6>
                        <DateTimePickerComponent />
                    </div>
                    <div className="col s6">
                        <h6>Date Range picker</h6>
                        <DateRangePickerComponent />
                    </div>
                </div>

                <br /><hr /><br /> */}
{/* 
                <div className="row">
                    <div className="col s12" style={{ height: '30em'}}>
                        <h6>Date Range Calendar picker</h6>
                        <DateRangeCalendarPickerComponent />
                    </div>
                </div>

                <br /><hr /><br /> */}

                <div className="row">
                    <div className="col s12" style={{ height: '30em'}}>
                        <h6>Date Time Range picker</h6>
                        <DateTimeRangePickerComponent />
                    </div>
                </div>

            </div>
        )
    }
}
