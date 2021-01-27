import React, { useState } from 'react';

export default ({ pickerProps, handlePropsUpdate, isInput }) => {

	const [format, setFormat] = useState(pickerProps.format || undefined)
	const [weekStartsOn, setWeekStartsOn] = useState(pickerProps.weekStartsOn || undefined)
	// const [closeButtonText, setCloseBtnText] = useState(pickerProps.closeButtonText || undefined)
	const [isDisabled, setIsDisabled] = useState(false)

	const handleSubmit = () => {
		handlePropsUpdate({ ...pickerProps, format, isDisabled,
			weekStartsOn: !!Number(weekStartsOn) ? Number(weekStartsOn) : undefined
		})
	}

	const handleCheckbox = (e) => {
		if (e) e.preventDefault();
		setIsDisabled(!isDisabled)
	}

	return (
		<div className='form-wrapper'>
			<div className="row">
				<div className="col s12">
					<h3 className="pad-bottom-8">Props Selector</h3>

					<div className="input-field">
						<input className="input-class"
							placeholder="Default : dd/MM/YYY" value={format}
							onChange={e => setFormat(e.target.value)} />
						<label className="active">Format ( Optional )</label>
					</div>

					<div className="input-field">
						<input className="input-class"
							placeholder="Default : 0, Values - [0-6]" value={weekStartsOn}
							onChange={e => setWeekStartsOn(e.target.value)} />
						<label className="active">Week Starts On ( Optional )</label>
					</div>

					{isInput &&
						<div className='disabled-wrapper pad-bottom-16'>
							<div className="switch" onClick={handleCheckbox}>
								<label>
									<input type="checkbox" checked={isDisabled} readOnly />
									<span className="lever"></span>
									isDisabled
								</label>
							</div>
						</div>
					}

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