import React, { useState } from 'react';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { useTimePickerProps } from '../hooks/timepicker.hooks';
import { TimePicker, TimePickerInput } from 'react-datetime-range-super-picker';

const PropSelector = ({pickerProps, handlePropsUpdate}) => {

	const [format, setFormat] = useState(pickerProps.format || '')

	const handleSubmit = () => {
		handlePropsUpdate({...pickerProps, format})
	}

	return (
		<div className="row">
			<h3>Props Selector</h3>

			<div className="col s6">
				<label>Format</label>
				<input placeholder="Format" value={format} 
					onChange={e => setFormat(e.target.value)} />
			</div>

			<button className="btn waves-effect waves-light" onClick={handleSubmit} >
				Submit
				<i className="material-icons right">send</i>
			</button>
		</div>
	)
}



export default () => {
	const [isInput, setInput] = useState(false)
	const [pickerProps, pickerHtml, handlePropsUpdate] = useTimePickerProps()

	const [hour, setHour] = useState(22)
	const [minute, setMin] = useState(30)


	const handleTimeUpdate = ({time}) => {
		setHour(time.hour24)
		setMin(time.minute)
	}

	const TProps = {...pickerProps, 
		time: {hour24 : hour, minute }, onTimeUpdate: handleTimeUpdate
	}

	return (
		<div className="timepicker-wrapper">
			<button className="btn waves-effect waves-light" onClick={() => setInput(!isInput)} >
				{isInput ? 'Simple Component' : 'Input Component'}
				<i className="material-icons right">send</i>
			</button>
		
			<div className='row' style={{textAlign:'center', margin:"100px 0px"}}>
				{isInput ?
					<div className='col s4'>
						<div style={{marginBottom:"30px", fontSize:"2em"}}>Time Input</div>
						<TimePickerInput {...TProps} />
					</div>
				:
					<div className='col s4'>
						<div style={{marginBottom:"30px", fontSize:"2em"}}>Time Picker</div>
						<TimePicker {...TProps} />
					</div>
				}

				<div className="col s8">

					<SyntaxHighlighter language="javascript" style={atomDark}>
						{pickerHtml}
					</SyntaxHighlighter>
				</div>
			</div>

			<PropSelector pickerProps={pickerProps} handlePropsUpdate={handlePropsUpdate} />
		</div>
	)
}