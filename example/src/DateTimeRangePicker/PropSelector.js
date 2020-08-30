import React, { useState } from 'react';

export default ({pickerProps, handlePropsUpdate}) => {

	const [format, setFormat] = useState(pickerProps.format || undefined)
	const [timeFormat, setTimeFormat] = useState(pickerProps.timeFormat || undefined)
	const [dateFormat, setDateFormat] = useState(pickerProps.dateFormat || undefined)
	const [weekStartsOn, setWeekStartsOn] = useState(pickerProps.weekStartsOn || undefined)
	const [closeButtonText, setCloseBtnText] = useState(pickerProps.closeButtonText || undefined)

	const handleSubmit = () => {
		handlePropsUpdate({...pickerProps, 
			format, timeFormat, dateFormat, closeButtonText,
			weekStartsOn: !!Number(weekStartsOn) ? Number(weekStartsOn) : undefined
		})
	}

	return (
		<div className='form-wrapper'>
			<div className="row">
				<div className="col s12">
					<h3 className="pad-bottom-8">Props Selector</h3>

					<div className="input-field">
						<input className="input-class" 
							placeholder="Default : dd/MM/YYY hh:mm aaa" value={format} 
							onChange={e => setFormat(e.target.value)} />
						<label className="active">Format ( Optional )</label>
					</div>

					<div className="input-field">
						<input className="input-class" 
							placeholder="Default : hh:mm aaa" value={timeFormat} 
							onChange={e => setTimeFormat(e.target.value)} />
						<label className="active">Time Format ( Optional )</label>
					</div>

					<div className="input-field">
						<input className="input-class" 
							placeholder="Default : dd/MM/YYY" value={dateFormat} 
							onChange={e => setDateFormat(e.target.value)} />
						<label className="active">Date Format ( Optional )</label>
					</div>

					<div className="input-field">
						<input className="input-class" 
							placeholder="Default : 0, Values - [0-6]" value={weekStartsOn} 
							onChange={e => setWeekStartsOn(e.target.value)} />
						<label className="active">Week Starts On ( Optional )</label>
					</div>

					<div className="input-field">
						<input className="input-class" 
							placeholder="Default : Close" value={closeButtonText} 
							onChange={e => setCloseBtnText(e.target.value)} />
						<label className="active">Close Button Text ( Optional )</label>
					</div>

				</div>
			</div>
			<div className='submit-btn-wrapper'>
				<button className="btn waves-effect waves-light red lighten-2" onClick={handleSubmit} >
					Update Props
					<i className="material-icons right">edit</i>
				</button>
			</div>
		</div>
	)
}