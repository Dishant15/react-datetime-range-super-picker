import React, { useState } from 'react';
import { DateRangeCalendarPickerInput, DateRangeCalendarPicker } from 'react-datetime-range-super-picker';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import PropSelector from "./PropSelector";
import StyleSelector from "../components/StyleSelector";
import ThemeSelector from "../components/ThemeSelector";

import { useRangePickerProps } from './daterangepicker.hooks';


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
	 * 		DateRangePickerInput
	 */
	
	const [pickerProps, pickerHtml, handlePropsUpdate] = useRangePickerProps()

	const [from_date, setFromDate] = useState(new Date())
	const [to_date, setToDate] = useState(new Date())
	const [isCopy, setCopy] = useState(false)


	const handleFromDateUpdate = ({date}) => {
		setFromDate(date)
	}
	const handleToDateUpdate = ({date}) => {
		setToDate(date)
	}

	const TProps = {...pickerProps, 
		from_date, to_date, 
		onFromDateUpdate: handleFromDateUpdate,
		onToDateUpdate: handleToDateUpdate
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
			<div className='heading'>Date Range Picker</div>
		
			<div className='row'>
				
				<div className='col s12 l8'>
					<div className='picker-wrapper'>

						<div className="range-picker-input-wrapper">
							<DateRangeCalendarPicker {...TProps} />
						</div>
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