import React, { useCallback, useState } from 'react'

import TimePickerDemo from './components/TimePickerDemo'
import DatePickerDemo from './components/DatePickerDemo'

import 'react-datetime-range-super-picker/dist/index.css'


const App = () => {
	
	const [selectedComponent, setComponent] = useState('timePicker')

	const renderComponent = useCallback(() => {
		if(selectedComponent === 'timePicker') {
			return <TimePickerDemo />
		}
		else if(selectedComponent === 'datePicker') {
			return <DatePickerDemo />
		}
	}, [selectedComponent])

	return(
		<div className="demo-wrapper">
			<div className="select-component">
				<div className={selectedComponent === 'timePicker' ? 'active' : ''} 
					onClick={() => setComponent('timePicker')}>
						Time Picker
				</div>

				<div className={selectedComponent === 'datePicker' ? 'active' : ''} 
					onClick={() => setComponent('datePicker')}>
						Date Picker
				</div>

				<div>Month Picker</div>
				<div>Date Time Picker</div>
			</div>

			{renderComponent()}
		</div>
	)
}

export default App
