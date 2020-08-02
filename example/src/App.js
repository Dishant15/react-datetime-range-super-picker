import React, { useCallback, useState } from 'react'

import TimePickerDemo from './TimePicker/TimePickerDemo'
import DatePickerDemo from './DatePicker/DatePickerDemo'
import MonthPickerDemo from './MonthPicker/MonthPickerDemo'

import './styles/materialize.css'
import './styles/layout.css'
import './styles/demo.css'
import 'react-datetime-range-super-picker/dist/index.css'


const App = () => {
	
	const [selectedComponent, setComponent] = useState('datePicker')

	const renderComponent = useCallback(() => {
		if(selectedComponent === 'timePicker') {
			return <TimePickerDemo />
		}
		else if(selectedComponent === 'datePicker') {
			return <DatePickerDemo />
		}
		else if(selectedComponent === 'monthPicker') {
			return <MonthPickerDemo />
		}
	}, [selectedComponent])

	return(
		<div className='layout-wrapper'>
			<div id="layout-menu">
				<div className={`${selectedComponent === 'timePicker' ? 'active': ''} layout-pill`}
					onClick={() => setComponent('timePicker')}>
						<i className="material-icons">access_time</i>
						Time Picker
				</div>

				<div className={`${selectedComponent === 'datePicker' ? 'active': ''} layout-pill`}
					onClick={() => setComponent('datePicker')}>
						<i className="material-icons">today</i>
						Date Picker
				</div>

				<div className={`${selectedComponent === 'dateTimePicker' ? 'active': ''} layout-pill`}
					onClick={() => setComponent('dateTimePicker')}>
						<span>
							<i className="material-icons">today</i>
							<i className="material-icons">access_time</i>
						</span>
						<div>Date Time Picker</div>
				</div>
				
				<div className={`${selectedComponent === 'rangePicker' ? 'active': ''} layout-pill`}
					onClick={() => setComponent('rangePicker')}>
						<i className="material-icons">date_range</i>
						Date Time Range Picker
				</div>

				<div className={`${selectedComponent === 'monthPicker' ? 'active': ''} layout-pill`}
					onClick={() => setComponent('monthPicker')}>
						<i className="material-icons">apps</i>
						Month Picker
				</div>
			</div>

			<div id="layout-content">
				{renderComponent()}
			</div>
		</div>
	)
}

export default App
