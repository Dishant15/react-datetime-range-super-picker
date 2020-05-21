import React, { useCallback, useState } from 'react'

import { TimePicker, MonthPicker, DatePicker } from 'react-datetime-range-super-picker'
import 'react-datetime-range-super-picker/dist/index.css'

const App = () => {

	const [res_day, setDay] = useState(20)
	const [res_month, setMonth] = useState(4)
	const [res_year, setYear] = useState(2020)

	const handleUpdate = useCallback(({month, year}) => {
		setMonth(month)
		setYear(year)
	}, [])

	const handleDateUpdate = ({date}) => {
		setMonth(date.getMonth())
		setYear(date.getFullYear())
		setDay(date.getDate())
	}

	const date = new Date(res_year, res_month, res_day)

	return (
		<div style={{textAlign:'center', marginTop:"100px"}}>
			<div style={{margin:"50px 0px", fontSize:"2em"}}>DatePicker</div>
			<DatePicker weekStartsOn={0} date={date}
				onDateUpdate={handleDateUpdate} />

			{/* <div style={{margin:"50px 0px", fontSize:"2em"}}>TimePicker</div>
			<TimePicker time={{hour24 : 22, minute : 30}} 
				onTimeUpdate={(time) => console.log(time)} /> */}

			<div style={{margin:"50px 0px", fontSize:"2em"}}>MonthPicker</div>
			<MonthPicker time={date}
				onDateUpdate={handleUpdate} />
		</div>
	)
}

export default App
