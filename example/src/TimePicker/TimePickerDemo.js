import React, { useState } from 'react';
import { TimePicker, TimePickerInput } from 'react-datetime-range-super-picker';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import PropSelector from "./PropSelector";
import StyleSelector from "../components/StyleSelector";
import ThemeSelector from "../components/ThemeSelector";

import { useTimePickerProps } from './timepicker.hooks';

export default () => {
	
	const [pickerProps, pickerHtml, handlePropsUpdate,
		isInput, handleToggleInput] = useTimePickerProps()

	const [hour, setHour] = useState(22)
	const [minute, setMin] = useState(30)
	const [isCopy, setCopy] = useState(false)


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

	const onCopyClick = () => {
		window.Clipboard.copy(pickerHtml);
		setCopy(true)

		setTimeout(() => {
			setCopy(false)
		}, 3000);
	}

	return (
		<div className="timepicker-wrapper">
			<div className='heading'>Time Picker</div>
		
			<div className='row'>
				
				<div className='col s12 m5 l4'>
					<div className='picker-wrapper'>
						<div className="switch" onClick={handleInputToggle}>
							<label>
								<input type="checkbox" checked={isInput} readOnly/>
								<span className="lever"></span>
								Input Component
							</label>
						</div>

						{isInput ? 
							<div className="time-pad-bot">
								<TimePickerInput {...TProps} /> 
							</div>
							:
							<TimePicker {...TProps} />
						}
					</div>

					<ThemeSelector pickerProps={pickerProps} handlePropsUpdate={handlePropsUpdate}/>

				</div>

				<div className="col s12 m7 l8">
					
					<div className="code-wrapper">
						{isCopy ?
							<div className="copy-block">
								<i className="material-icons" >content_paste</i>
							</div>
							:
							<div className="copy-block">
								<i className="material-icons" onClick={onCopyClick} >content_copy</i>
							</div>
						}
						<SyntaxHighlighter language="javascript" style={atomDark}>
							{pickerHtml}
						</SyntaxHighlighter>
					</div>
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