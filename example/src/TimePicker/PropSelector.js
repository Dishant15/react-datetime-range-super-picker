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

					<div class="input-field">
						<input placeholder="Format" value={format} 
							onChange={e => setFormat(e.target.value)} />
						<label class="active">Format</label>
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