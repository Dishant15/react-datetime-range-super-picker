import React, { useState } from 'react';
import { DateTimePicker, DateTimePickerInput } from 'react-datetime-range-super-picker';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import PropSelector from "./PropSelector";
import StyleSelector from "../components/StyleSelector";
import { useTimePickerProps } from './datetimepicker.hooks';

const inputStyle = {
	border: 'none',
	outline: 'none',
	fontSize: '0.9em',
	height: '2.5em',
	padding: '.2em 1.2em .2em .5em',
	borderRadius: '0.417em',
	backgroundColor: '#f7f7f7',
	color: '#6c6b6b',
}

export default () => {
	
	const [pickerProps, pickerHtml, handlePropsUpdate,
		isInput, handleToggleInput] = useTimePickerProps()

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
							<DateTimePickerInput {...TProps} inputStyle={inputStyle} /> : <DateTimePicker {...TProps} />}
					</div>
				</div>

				<div className="col s12 m4 14">
					
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