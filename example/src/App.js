import React, { useCallback, useState } from 'react'

import TimePickerDemo from './components/TimePickerDemo'
import DatePickerDemo from './components/DatePickerDemo'

import './styles/materialize.css'
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
		<div className="container">
			<div className="row">
				<div className={`${selectedComponent === 'timePicker' && 'active'} 
					col s3 
					z-depth-1 amber lighten-5`}
					onClick={() => setComponent('timePicker')}>
						Time Picker
				</div>

				<div className={`${selectedComponent === 'datePicker' && 'active'} col s3`}
					onClick={() => setComponent('datePicker')}>
						Date Picker
				</div>

				<div>Date Time Picker</div>
				<div>Date Time Range Picker</div>

				<div>Month Picker</div>
			</div>

			{renderComponent()}
		</div>
	)
}

export default App
