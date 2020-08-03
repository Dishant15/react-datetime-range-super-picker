import React, { useState } from 'react';
import { DateTimeRangePicker, DateTimeRangePickerInput } from 'react-datetime-range-super-picker';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import PropSelector from "./PropSelector";
import StyleSelector from "../components/StyleSelector";
import ThemeSelector from "../components/ThemeSelector";

import { useTimePickerProps } from './datetimerangepicker.hooks';


export default () => {
	
	const [pickerProps, pickerHtml, handlePropsUpdate,
		isInput, handleToggleInput] = useTimePickerProps()

	const [from_date, setFromDate] = useState(new Date())
	const [to_date, setToDate] = useState(new Date())
	const [isCopy, setCopy] = useState(false)


	const handleFromDateUpdate = ({date}) => {
		setFromDate(date.date)
	}
	const handleToDateUpdate = ({date}) => {
		setToDate(date.date)
	}

	const TProps = {...pickerProps, 
		from_date, to_date, 
		onFromDateTimeUpdate: handleFromDateUpdate,
		onToDateTimeUpdate: handleToDateUpdate
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
			<div className='heading'>Date Time Range Picker</div>
		
			<div className='row'>
				
				<div className='col s12 l8'>
					<div className='picker-wrapper'>
						<div className="switch" onClick={handleInputToggle}>
							<label>
								<input type="checkbox" checked={isInput} readOnly/>
								<span className="lever"></span>
								Input Component
							</label>
						</div>

						{isInput ? 
							<div className="range-picker-pad-bot">
								<DateTimeRangePickerInput {...TProps} />
							</div>
							:
							<DateTimeRangePicker {...TProps} />
						}
					</div>
					<ThemeSelector pickerProps={pickerProps} handlePropsUpdate={handlePropsUpdate}/>

				</div>

				<div className="col s12 l4">
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