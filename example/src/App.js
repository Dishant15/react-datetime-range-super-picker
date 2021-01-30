import React, { useCallback, useState } from 'react'

import TimePickerDemo from './TimePicker/TimePickerDemo'
import DatePickerDemo from './DatePicker/DatePickerDemo'
import MonthPickerDemo from './MonthPicker/MonthPickerDemo'
import DateTimePickerDemo from './DateTimePicker/DateTimePickerDemo'
import DateTimeRangePickerDemo from './DateTimeRangePicker/DateTimeRangePickerDemo'
import DateRangePickerDemo from './DateRangePicker/DateRangePickerDemo'
import DateRangeCalendarPickerDemo from './DateRangeCalendarPicker/DateRangeCalendarPickerDemo'

import './styles/materialize.css'
import './styles/layout.css'
import './styles/demo.css'
import 'react-datetime-range-super-picker/dist/index.css'


const App = () => {

	/**
	 * Parent :
	 * 		index
	 * 
	 * Renders:
	 * 		TimePickerDemo
	 * 		DatePickerDemo
	 * 		MonthPickerDemo
	 * 		DateTimePickerDemo
	 * 		DateTimeRangePickerDemo
	 * 		DateRangePickerDemo
	 */

	const [selectedComponent, setComponent] = useState('timePicker')

	const renderComponent = useCallback(() => {
		if (selectedComponent === 'timePicker') {
			return <TimePickerDemo />
		}
		else if (selectedComponent === 'datePicker') {
			return <DatePickerDemo />
		}
		else if (selectedComponent === 'monthPicker') {
			return <MonthPickerDemo />
		}
		else if (selectedComponent === 'dateTimePicker') {
			return <DateTimePickerDemo />
		}
		else if (selectedComponent === 'rangePicker') {
			return <DateTimeRangePickerDemo />
		}
		else if (selectedComponent === 'dateRangePicker') {
			return <DateRangePickerDemo />
		}
		else if (selectedComponent === 'dateRangeCalendarPicker') {
			return <DateRangeCalendarPickerDemo />
		}
	}, [selectedComponent])

	return (
		<div className='layout-wrapper'>
			<div id="layout-menu">
				<div className={`${selectedComponent === 'timePicker' ? 'active' : ''} layout-pill`}
					onClick={() => setComponent('timePicker')}>
					<i className="material-icons">access_time</i>
						Time Picker
				</div>

				<div className={`${selectedComponent === 'datePicker' ? 'active' : ''} layout-pill`}
					onClick={() => setComponent('datePicker')}>
					<i className="material-icons">today</i>
						Date Picker
				</div>

				<div className={`${selectedComponent === 'dateTimePicker' ? 'active' : ''} layout-pill`}
					onClick={() => setComponent('dateTimePicker')}>
					<span>
						<i className="material-icons">today</i>
						<i className="material-icons">access_time</i>
					</span>
					<div>Date Time Picker</div>
				</div>

				<div className={`${selectedComponent === 'dateRangePicker' ? 'active' : ''} layout-pill`}
					onClick={() => setComponent('dateRangePicker')}>
					<i className="material-icons">date_range</i>
						Date Range Picker
				</div>

				<div className={`${selectedComponent === 'dateRangeCalendarPicker' ? 'active' : ''} layout-pill`}
					onClick={() => setComponent('dateRangeCalendarPicker')}>
					<i className="material-icons">date_range</i>
						Date Range Calendar Picker
				</div>


				<div className={`${selectedComponent === 'rangePicker' ? 'active' : ''} layout-pill`}
					onClick={() => setComponent('rangePicker')}>
					<i className="material-icons">date_range</i>
						Date Time Range Picker
				</div>

				<div className={`${selectedComponent === 'monthPicker' ? 'active' : ''} layout-pill`}
					onClick={() => setComponent('monthPicker')}>
					<i className="material-icons">apps</i>
						Month Picker
				</div>
			</div>

			<div id="layout-content">
				<a className="git-wrapper" href="https://github.com/Dishant15/react-datetime-range-super-picker" 
					target="_blank" rel="noopener noreferrer">
					<svg height="32" viewBox="0 0 16 16" 
						version="1.1" width="32" aria-hidden="true">
						<path fillRule="evenodd" 
							d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z">
						</path>
					</svg>
					<span className="text">View on GitHub</span>
				</a>
				{renderComponent()}
			</div>
		</div>
	)
}

export default App
