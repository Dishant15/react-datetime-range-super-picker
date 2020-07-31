import React from 'react';
import { get } from "lodash";

export default class StyleSelector extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			theme : props.theme || '',
			colors : {
				primary_color: get(props, 'colors.primary_color', ''),
				secondary_color: get(props, 'colors.secondary_color', ''),
			}
		}
	}

	handleThemeUpdate = (e) => {
		this.setState({theme: e.target.value})
	}

	handleColorUpdate = (e) => {
		const colors = {...this.state.colors}
		colors[e.target.name] = e.target.value
		this.setState({colors})
	}

	handleSubmit = () => {
		this.props.handlePropsUpdate({
			...this.props.pickerProps, 
			...this.state
		})
	}

	render = () => {
		const {theme} = this.state
		const {primary_color, secondary_color} = this.state.colors

		return (
			<div className='form-wrapper'>
				<div className="row">
					<div className="col s12">
						<h3>Style Selector</h3>

						<label>Theme</label>
						<input placeholder="light, dark" value={theme} 
							onChange={this.handleThemeUpdate} />

						<label>Primary Color</label>
						<input placeholder="rgb, hex, color name ..." 
							value={primary_color} name="primary_color"
							onChange={this.handleColorUpdate} />

						<label>Secondary Color</label>
						<input placeholder="rgb, hex, color name ..." 
							value={secondary_color} name="secondary_color"
							onChange={this.handleColorUpdate} />
					</div>
				</div>
				<div className='submit-btn-wrapper'>
					<button className="btn waves-effect waves-light" onClick={this.handleSubmit} >
						Update Style
						<i className="material-icons right">send</i>
					</button>
				</div>
			</div>
		)
	}
}