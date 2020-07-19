import React from 'react'
import { assign } from 'lodash'
import { getThemeColors } from './style.theme'

/**
 * Wrapper component to all exported library components
 * 
 * Merge theme colors with prop colors or default colors
 * and create colors object to be used by all component
 */
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