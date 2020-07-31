import React, { useState } from 'react';
import { TimePicker, TimePickerInput } from 'react-datetime-range-super-picker';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import PropSelector from "./PropSelector";
import StyleSelector from "../components/StyleSelector";
import { useTimePickerProps } from './timepicker.hooks';



export default () => {
	
	const [pickerProps, pickerHtml, handlePropsUpdate,
		isInput, handleToggleInput] = useTimePickerProps()

	const [hour, setHour] = useState(22)
	const [minute, setMin] = useState(30)


	const handleTimeUpdate = ({time}) => {
		setHour(time.hour24)
		setMin(time.minute)
	}

	const TProps = {...pickerProps, 
		time: {hour24 : hour, minute }, onTimeUpdate: handleTimeUpdate
	}

	const handleInputToggle = (e) => {
		if(e) e.preventDefault();
		handleToggleInput(!isInput)
	}

	return (
		<div className="timepicker-wrapper">
			<div className='heading'>Time Picker</div>
		
			<div className='row'>
				
				<div className='col s12 m5 l4'>
					<div className='picker-wrapper'>
						<div class="switch" onClick={handleInputToggle}>
							<label>
								<input type="checkbox" checked={isInput} />
								<span class="lever"></span>
								Input Component
							</label>
						</div>

						{isInput ? 
							<TimePickerInput {...TProps} /> : <TimePicker  key={JSON.stringify(pickerProps.colors)} {...TProps} />}
					</div>
				</div>

				<div className="col s12 m7 l8">

					<SyntaxHighlighter language="javascript" style={atomDark}>
						{pickerHtml}
					</SyntaxHighlighter>
				</div>
			</div>

			<hr />
			
			<div className='row'>
				<div className="col s12 m6">
					<PropSelector pickerProps={pickerProps} handlePropsUpdate={handlePropsUpdate} />
				</div>

				<div className="col s12 m6">
					<StyleSelector pickerProps={pickerProps} handlePropsUpdate={handlePropsUpdate} />
				</div>
			</div>
		</div>
	)
}