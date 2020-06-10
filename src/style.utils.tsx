import React from 'react'

import { assign } from 'lodash'


export type ComponentTheme = {
	primary_color?: string,
	primary_font_color?: string,
	light_font_color?: string,
	
	secondary_color?: string,
	other_color?: string,

	primary_highlight_color?: string,
	secondary_highlight_color?: string,
}


const LIGHT_THEME_COLORS = {
	primary_color : 'white',
	primary_font_color : 'rgba(0, 0, 0, 0.57)',
	light_font_color : 'rgba(0,0,0, 0.35)',
	
	secondary_color: '#51ADAC',
	other_color: '#efefef',

	primary_highlight_color: '#88b04b',
	secondary_highlight_color: '#00aab2',
}

const getThemeColors = (theme = 'light') => {
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