import React, { useState } from 'react';
import { DateTimePicker, DateTimePickerInput } from 'react-datetime-range-super-picker';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import PropSelector from "./PropSelector";
import StyleSelector from "../components/StyleSelector";
import ThemeSelector from "../components/ThemeSelector";

import { useDateTimePickerProps } from './datetimepicker.hooks';


export default () => {

	/**
	 * Parent:
	 * 		App
	 * 
	 * Renders:
	 * 		PropSelector
	 * 		StyleSelector
	 * 		ThemeSelector
	 * 
	 * 		DateTimePicker
	 * 		DateTimePickerInput
	 */
	
	const [pickerProps, pickerHtml, handlePropsUpdate,
		isInput, handleToggleInput] = useDateTimePickerProps()

    const [curr_date, setDate] = useState(new Date())
	const [isCopy, setCopy] = useState(false)


	const handleDateUpdate = ({date}) => {
        setDate(date.date)
    }

	const TProps = {...pickerProps, 
		date: curr_date, onDateTimeUpdate: handleDateUpdate
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
			<div className='heading'>Date Time Picker</div>
		
			<div className='row'>
				
				<div className='col s12 m8 l8'>
					<div className='picker-wrapper'>
						<div className="switch" onClick={handleInputToggle}>
							<label>
								<input type="checkbox" checked={isInput} readOnly/>
								<span className="lever"></span>
								Input Component
							</label>
						</div>

						{isInput ? 
							<div className="datetime-pad-bot">
								<DateTimePickerInput {...TProps} /> 
							</div>
							:
							<DateTimePicker {...TProps} />}
					</div>
					<ThemeSelector pickerProps={pickerProps} handlePropsUpdate={handlePropsUpdate}/>

				</div>

				<div className="col s12 m4 l4">
					
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