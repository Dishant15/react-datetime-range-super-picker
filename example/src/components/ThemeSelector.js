import React, { Component } from 'react'

export default class ThemeSelector extends Component {

    state = {
        theme : 'light',
    }

    handleThemeUpdate = (theme) => {
        this.setState({theme})
        
        this.props.handlePropsUpdate({
			...this.props.pickerProps, 
			theme
		})
	}

    render = () => {
        const {theme} = this.state

        return (
            <div className="theme-action-wrapper">
                <div className="pad-bottom-16">
                    <div>Select Theme</div>
                </div>
                <div>
                    <div className={`waves-effect waves-light btn z-depth-1 light-btn mr-right ${theme === 'light' ? 'active z-depth-2' : ''}`}
                        onClick={this.handleThemeUpdate.bind(this, 'light')}>LIGHT</div>
                    <div className={`waves-effect waves-light btn z-depth-1 dark-btn ${theme === 'dark' ? 'active z-depth-2' : ''}`}
                        onClick={this.handleThemeUpdate.bind(this, 'dark')}>DARK</div>
                </div>
            </div>
        )
    }
}
