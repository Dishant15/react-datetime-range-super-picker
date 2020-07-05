import { ComponentTheme, InlineCssStyles } from '../interfaces/style.interfaces';

export const getWrapperStyles = (colors: ComponentTheme) => ({
	background: colors.primary_color,
	color: colors.primary_font_color
})

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

export const getDoneBtnStyles = (colors: ComponentTheme) => ({
	color: colors.primary_color,
	'--donebtn-hover-bg-color': colors.primary_color,
	'--donebtn-hover-color': colors.primary_highlight_color,
})
