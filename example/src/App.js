import React, { useCallback, useState } from 'react'

import { TimePicker, MonthPicker, 
	DatePicker, DatePickerInput,
	DateTimePicker, DateTimePickerInput,
	DateTimeRangePicker, DateTimeRangePickerInput } from 'react-datetime-range-super-picker'
import 'react-datetime-range-super-picker/dist/index.css'

const App = () => {

	const [res_day, setDay] = useState(-40)
	const [res_month, setMonth] = useState(1)
	const [res_year, setYear] = useState(2020)
		
	const [hour, setHour] = useState(22)
	const [minute, setMin] = useState(30)

	const [date, setDate] = useState(new Date())

	const [str_date, setStrDate] = useState('02-05-2020 5:30 am')

	const handleStrDateUpdate = (args) => {
        console.log("handleStrDateUpdate -> args", args)
		setStrDate(args.formatted)
	}

	const [from_date, setFromDate] = useState(new Date())
	const [to_date, setToDate] = useState(new Date())

	const handleRangePickerFromDate = ({date}) => {
		setFromDate(date.date)
	}

	const handleRangePickerToDate = ({date}) => {
		setToDate(date.date)
	}

	const handleUpdate = useCallback(({month, year}) => {
		setMonth(month)
		setYear(year)
	}, [])

	const handleDateUpdate = ({month, year, day}) => {
		setMonth(month)
		setYear(year)
		setDay(day)
	}

	const handleTimeUpdate = ({time}) => {
		setHour(time.hour24)
		setMin(time.minute)
	}

	const handleFullDateTimeUpdate = (args) => {
		setDate(args.date.date)
	}

	return (
		<div style={{textAlign:'center', margin:"100px 0px"}}>

		<div style={{display:'flex', padding: '50px', marginBottom:'200px'}}>
			<div style={{flex:1}}>
				<DateTimeRangePickerInput from_date={from_date} to_date={to_date}
					onFromDateTimeUpdate={handleRangePickerFromDate} 
					onToDateTimeUpdate={handleRangePickerToDate} />
			</div>
			<div style={{flex:1, borderLeft:'1px dashed grey'}}>
				<DateTimeRangePicker from_date={from_date} to_date={to_date}
					onFromDateTimeUpdate={handleRangePickerFromDate} 
					onToDateTimeUpdate={handleRangePickerToDate} />
			</div>
		</div>

		<div style={{display:'flex', padding: '50px', marginBottom:'200px'}}>
			<div style={{flex:1}}>
				<div style={{marginBottom:"30px", fontSize:"2em"}}>Date Time Picker Input</div>
				<DateTimePickerInput date={date}
					onDateTimeUpdate={handleFullDateTimeUpdate} />
			</div>

			<div style={{flex:1, borderLeft:'1px dashed grey'}}>
				<div style={{marginBottom:"30px", fontSize:"2em"}}>Date Picker Input</div>
				<DatePickerInput date={{day:res_day, month: res_month, year:res_year}}
					onDateUpdate={handleDateUpdate} />
			</div>

			<div style={{flex:1, borderLeft:'1px dashed grey'}}>
				<div style={{marginBottom:"30px", fontSize:"2em"}}>Date Time Picker</div>
				<DateTimePicker date={str_date} format="dd-MM-y hh:mm aaa"
					onDateTimeUpdate={handleStrDateUpdate} />
			</div>
		</div>

		<div style={{display:'flex', padding: '50px'}}>
			<div style={{flex:1, borderRight:'1px dashed grey'}}>
				<div style={{marginBottom:"30px", fontSize:"2em"}}>Date Picker</div>
				<DatePicker weekStartsOn={0} date={str_date}
					onDateUpdate={handleStrDateUpdate} format="dd-MM-y" />
			</div>

			<div style={{flex:1}}>
				<div style={{marginBottom:"30px", fontSize:"2em"}}>Time Picker</div>
				<TimePicker time={{hour24 : hour, minute }} colors={{primary_color:'black'}}
					onTimeUpdate={handleTimeUpdate} />
			</div>

			<div style={{flex:1, borderLeft:'1px dashed grey'}}>
				<div style={{marginBottom:"30px", fontSize:"2em"}}>Month Picker</div>
				<MonthPicker time={date}
					onDateUpdate={handleUpdate} />
			</div>
		</div>

		</div>
	)
}

export default App
