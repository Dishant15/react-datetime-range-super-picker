import { ComponentTheme, InlineCssStyles } from '../interfaces/style.interfaces';

export const getHeaderFieldColors = (
	colors:ComponentTheme, is_active:boolean
) : InlineCssStyles => {
	if(is_active) {
		return {
			background: colors.primary_color,
			color: colors.secondary_highlight_color,
			fontWeight: 'bold',
		}
	} else {
		return {
			color: colors.primary_color,
			background: colors.secondary_highlight_color,
			WebkitFilter:'brightness(113%)',
			filter:'brightness(113%)'
		}
	}
}

export const getActivePillColors = (
	colors:ComponentTheme, is_active:boolean
) : InlineCssStyles => {
	if(is_active) {
		return {
			color: colors.primary_color,
			'--active-pill-hover-color': colors.primary_color
		}
	} else {
		return { '--active-pill-hover-color': colors.primary_color }
	}
}
