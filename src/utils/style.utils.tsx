import React from 'react'
import { assign } from 'lodash'

import { ComponentTheme } from '../interfaces/style.interfaces'


const LIGHT_THEME_COLORS:ComponentTheme = {
	primary_color : 'white',
	primary_font_color : 'rgba(0, 0, 0, 0.57)',
	light_font_color : 'rgba(0,0,0, 0.35)',
	
	secondary_color: '#51ADAC',
	other_color: '#efefef',

	primary_highlight_color: '#88b04b',
	secondary_highlight_color: '#00aab2',
}

const getThemeColors = (theme = 'light'):ComponentTheme => {
	switch (theme) {
		case 'light':
			return LIGHT_THEME_COLORS
	
		default:
			return LIGHT_THEME_COLORS;
	}
}

export default (WrappedComponent : React.ElementType) => {

	return class extends React.Component<any> {

		render = () => {
			const {colors, theme, ...otherProps} = this.props
			const themeColors = assign(getThemeColors(theme), colors)
			const mergeProps = {...otherProps, colors: themeColors}

			return <WrappedComponent {...mergeProps}  />
		}
	}
}