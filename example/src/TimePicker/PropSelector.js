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
					<h3>Props Selector</h3>
					<label>Format</label>
					<input placeholder="Format" value={format} 
						onChange={e => setFormat(e.target.value)} />
				</div>
			</div>
			<div className='submit-btn-wrapper'>
				<button className="btn waves-effect waves-light" onClick={handleSubmit} >
					Update Props
					<i className="material-icons right">send</i>
				</button>
			</div>
		</div>
	)
}