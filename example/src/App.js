import React, { useCallback, useState } from 'react'

import { TimePicker, MonthPicker, DatePicker } from 'react-datetime-range-super-picker'
import 'react-datetime-range-super-picker/dist/index.css'

const App = () => {

	const [res_day, setDay] = useState(5)
	const [res_month, setMonth] = useState(4)
	const [res_year, setYear] = useState(2020)
		
	const [hour, setHour] = useState(22)
	const [minute, setMin] = useState(30)

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

	const date = new Date(res_year, res_month, res_day)

	return (
		<div style={{textAlign:'center', margin:"100px 0px"}}>
		<div style={{display:'flex', padding: '50px'}}>
			<div style={{flex:1, borderRight:'1px dashed grey'}}>
				<div style={{marginBottom:"30px", fontSize:"2em"}}>Date Picker</div>
				<DatePicker weekStartsOn={0} date={{day:res_day, month: res_month, year:res_year}}
					onDateUpdate={handleDateUpdate} format="dd-MM-YYY" />
			</div>

			<div style={{flex:1}}>
				<div style={{marginBottom:"30px", fontSize:"2em"}}>Time Picker</div>
				<TimePicker time={{hour24 : hour, minute }} 
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
