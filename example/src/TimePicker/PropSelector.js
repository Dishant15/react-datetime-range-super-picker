import React, { useState } from 'react';

export default ({pickerProps, handlePropsUpdate}) => {

	const [format, setFormat] = useState(pickerProps.format || '')

	const handleSubmit = () => {
		handlePropsUpdate({...pickerProps, format})
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