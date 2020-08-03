import React, { useState } from 'react';
import { MonthPicker } from 'react-datetime-range-super-picker';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import StyleSelector from "../components/StyleSelector";
import ThemeSelector from "../components/ThemeSelector";

import { useTimePickerProps } from './monthpicker.hooks';


export default () => {

	const [pickerProps, pickerHtml, handlePropsUpdate] = useTimePickerProps()

	const [res_month, setMonth] = useState(4)
	const [res_year, setYear] = useState(2020)
	const [isCopy, setCopy] = useState(false)


	const handleDateUpdate = ({ month, year }) => {
		setMonth(month)
		setYear(year)
	}

	const MProps = {
		...pickerProps,
		time: { month: res_month, year: res_year }, onDateUpdate: handleDateUpdate
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
			<div className='heading'>Month Picker</div>

			<div className='row'>

				<div className='col s12 m5 l4'>
					<div className='picker-wrapper'>
						<MonthPicker {...MProps} />
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
				<div className="col s12 m6 push-m3 pull-m3">
					<StyleSelector pickerProps={pickerProps} handlePropsUpdate={handlePropsUpdate} />
				</div>
			</div>
		</div>
	)
}