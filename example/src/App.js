import React from 'react'

import { TimePicker, MonthPicker } from 'react-datetime-range-super-picker'
import 'react-datetime-range-super-picker/dist/index.css'

const App = () => {
	return (
		<div style={{textAlign:'center', marginTop:"100px"}}>

			<div style={{margin:"50px 0px", fontSize:"2em"}}>TimePicker</div>
			<TimePicker time={{hour24 : 22, minute : 30}} 
				onTimeUpdate={(time) => console.log(time)} />

			<div style={{margin:"50px 0px", fontSize:"2em"}}>MonthPicker</div>
			<MonthPicker time={new Date()}
				onTimeUpdate={(time) => console.log(time)} />
		</div>
	)
}

export default App
