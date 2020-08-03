import React, { useState } from 'react';

export default ({pickerProps, handlePropsUpdate}) => {

	const [format, setFormat] = useState(pickerProps.format || undefined)
	const [weekStartsOn, setWeekStartsOn] = useState(pickerProps.weekStartsOn || undefined)

	const handleSubmit = () => {
		handlePropsUpdate({...pickerProps, format, weekStartsOn: Number(weekStartsOn)})
	}

	return (
		<div className='form-wrapper'>
			<div className="row">
				<div className="col s12">
					<h3 className="pad-bottom-8">Props Selector</h3>

					<div className="input-field">
						<input className="input-class" 
							placeholder="Default : do MMMM yyyy" value={format} 
							onChange={e => setFormat(e.target.value)} />
						<label className="active">Format ( Optional )</label>
					</div>

					<div className="input-field">
						<input className="input-class" 
							placeholder="Default : 0, Values - [0-6]" value={weekStartsOn} 
							onChange={e => setWeekStartsOn(e.target.value)} />
						<label className="active">Week Starts On ( Optional )</label>
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