import React, { useCallback, useState } from 'react'

import { TimePicker, MonthPicker, DatePicker } from 'react-datetime-range-super-picker'
import 'react-datetime-range-super-picker/dist/index.css'

const App = () => {

	const [res_day, setDay] = useState(31)
	const [res_month, setMonth] = useState(4)
	const [res_year, setYear] = useState(2020)
		
	const [hour, setHour] = useState(22)
	const [minute, setMin] = useState(30)

	const handleUpdate = useCallback(({month, year}) => {
		setMonth(month)
		setYear(year)
	}, [])

	const handleDateUpdate = (args) => {
		const {date} = args
		setMonth(args.month)
		setYear(args.year)
		setDay(args.day)
	}

	const handleTimeUpdate = ({time}) => {
		setHour(time.hour24)
		setMin(time.minute)
	}

	// const date = new Date(res_year, res_month, res_day)

	return (
		<div style={{textAlign:'center', marginTop:"100px"}}>
			<div style={{margin:"50px 0px", fontSize:"2em"}}>DatePicker</div>
			<DatePicker weekStartsOn={0} date={{day:res_day, month: res_month, year:res_year}}
				onDateUpdate={handleDateUpdate} format="dd-MM-YYY" />

			<div style={{margin:"50px 0px", fontSize:"2em"}}>TimePicker</div>
			<TimePicker time={{hour24 : hour, minute }} 
				onTimeUpdate={handleTimeUpdate} />

			{/* <div style={{margin:"50px 0px", fontSize:"2em"}}>MonthPicker</div>
			<MonthPicker time={date}
				onDateUpdate={handleUpdate} /> */}
		</div>
	)
}

export default App
