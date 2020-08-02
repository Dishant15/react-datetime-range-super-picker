import React from 'react';
import { get } from "lodash";

export default class StyleSelector extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			theme : 'light',
			colors : {
				primary_color: get(props, 'colors.primary_color', ''),
				primary_highlight_color: get(props, 'colors.primary_highlight_color', ''),
				primary_font_color: get(props, 'colors.primary_font_color', ''),
				light_font_color: get(props, 'colors.light_font_color', ''),
				secondary_color: get(props, 'colors.secondary_color', ''),
				secondary_highlight_color: get(props, 'colors.secondary_highlight_color', ''),
			}
		}
	}

	handleThemeUpdate = (theme) => {
		this.setState({theme})
	}

	handleColorUpdate = (e) => {
		const colors = {...this.state.colors}
		colors[e.target.name] = e.target.value
		this.setState({colors})
	}

	handleSubmit = () => {
		// remove color if empty
		let colors = {...this.state.colors}
		for (const color in colors) {
			if (colors.hasOwnProperty(color)) {
				if(!colors[color]) delete colors[color];
			}
		}

		this.props.handlePropsUpdate({
			...this.props.pickerProps, 
			colors,
			theme: this.state.theme
		})
	}

	render = () => {
		const {theme} = this.state
		const {primary_color, secondary_color, 
			primary_font_color, light_font_color,
			secondary_highlight_color, primary_highlight_color} = this.state.colors

		return (
			<div className='form-wrapper'>
				<div className="row">
					<div className="col s12">
						<h3>Style Selector</h3>

						<label>Theme</label>
						<div className="theme-action-wrapper">
							<div className={`waves-effect waves-light btn z-depth-1 light-btn mr-right ${theme === 'light' ? 'active z-depth-2' : ''}`}
								onClick={this.handleThemeUpdate.bind(this, 'light')}>LIGHT</div>
							<div className={`waves-effect waves-light btn z-depth-1 dark-btn ${theme === 'dark' ? 'active z-depth-2' : ''}`}
								onClick={this.handleThemeUpdate.bind(this, 'dark')}>DARK</div>
						</div>

						<div class="input-field">
							<input placeholder="rgb, hex, color name ..." 
								value={primary_color} name="primary_color"
								onChange={this.handleColorUpdate} 
							/>
							<label class="active">Primary Color</label>
						</div>

						<div class="input-field">
							<input placeholder="rgb, hex, color name ..." 
								value={primary_highlight_color} name="primary_highlight_color"
								onChange={this.handleColorUpdate} />
							<label class="active">Primary highlight Color</label>
						</div>

						<div class="input-field">
							<input placeholder="rgb, hex, color name ..." 
								value={secondary_color} name="secondary_color"
								onChange={this.handleColorUpdate} />
							<label class="active">Secondary Color</label>
						</div>

						<div class="input-field">
							<input placeholder="rgb, hex, color name ..." 
								value={secondary_highlight_color} name="secondary_highlight_color"
								onChange={this.handleColorUpdate} />
							<label class="active">Secondary highlight Color</label>
						</div>

						<div class="input-field">
							<input placeholder="rgb, hex, color name ..." 
								value={primary_font_color} name="primary_font_color"
								onChange={this.handleColorUpdate} />
							<label class="active">Primary font Color</label>
						</div>

						<div class="input-field">
							<input placeholder="rgb, hex, color name ..." 
								value={light_font_color} name="light_font_color"
								onChange={this.handleColorUpdate} />
							<label class="active">Light font Color</label>
						</div>

					</div>
				</div>
				<div className='submit-btn-wrapper'>
					<button className="btn waves-effect waves-light red lighten-2" onClick={this.handleSubmit} >
						Update Style
						<i className="material-icons right">edit</i>
					</button>
				</div>
			</div>
		)
	}
}