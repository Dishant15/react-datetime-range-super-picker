import React, { useState } from 'react';

import { TimePicker, TimePickerInput } from 'react-datetime-range-super-picker'

export default () => {
	const [hour, setHour] = useState(22)
	const [minute, setMin] = useState(30)


	const handleTimeUpdate = ({time}) => {
		setHour(time.hour24)
		setMin(time.minute)
	}

	return (
		<div style={{textAlign:'center', margin:"100px 0px"}}>

			<div style={{display:'flex', padding: '50px'}}>
				

				<div style={{flex:1}}>
					<div style={{marginBottom:"30px", fontSize:"2em"}}>Time Picker</div>
					<TimePicker time={{hour24 : hour, minute }}
						onTimeUpdate={handleTimeUpdate} />
				</div>

				<div style={{flex:1, borderLeft:'1px dashed grey'}}>
					<div style={{marginBottom:"30px", fontSize:"2em"}}>Time Input</div>
					<TimePickerInput time={{hour24 : hour, minute }}
						onTimeUpdate={handleTimeUpdate} />
				</div>
			</div>

		</div>
	)
}