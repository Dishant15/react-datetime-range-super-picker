import React from 'react'
import { assign } from 'lodash'
import { getThemeColors } from './style.theme'
import { ComponentTheme } from '../interfaces/style.interfaces'


/**
 * Wrapper component to all exported library components
 * 
 * Merge theme colors with prop colors or default colors
 * and create colors object to be used by all component
 */
 const StyleWrapper = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
	return class ComponentWrapper extends React.Component<
    P & {colors: ComponentTheme, theme: string}
  > {
		render = () => {
			const {colors, theme, ...otherProps} = this.props
			// override theme colors provided by props
			let themeColors = {...getThemeColors(theme)}
			themeColors = assign(themeColors, colors)
			// pass-on other props with new colors
			const mergeProps = {...otherProps, colors: themeColors}

			return <WrappedComponent {...mergeProps as P} />
		}
	}
}

export default StyleWrapper