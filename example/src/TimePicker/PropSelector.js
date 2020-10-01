import React, { useState } from 'react';

export default ({pickerProps, handlePropsUpdate, isInput}) => {

	const [format, setFormat] = useState(pickerProps.format || undefined)
	const [isDisabled, setIsDisabled] = useState(false)

	const handleSubmit = () => {
		handlePropsUpdate({...pickerProps, format, isDisabled})
	}

	const handleCheckbox = (e) => {
		if(e) e.preventDefault();
		setIsDisabled(!isDisabled)
	}


	return (
		<div className='form-wrapper'>
			<div className="row">
				<div className="col s12">
					<h3 className="pad-bottom-8">Props Selector</h3>

					<div className="input-field">
						<input className="input-class"
							placeholder="Format" value={format} 
							onChange={e => setFormat(e.target.value)} />
						<label className="active">Format</label>
					</div>

					{isInput &&
						<div className='disabled-wrapper'>
							<div className="switch" onClick={handleCheckbox}>
								<label>
									<input type="checkbox" checked={isDisabled} readOnly/>
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