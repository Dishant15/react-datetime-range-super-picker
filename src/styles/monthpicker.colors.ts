import { ComponentTheme, InlineCssStyles } from '../interfaces/style.interfaces';

export const getMonthPillColors = (
	colors:ComponentTheme, is_active:boolean
) : InlineCssStyles => {
	if(is_active) {
		return {
			background: colors.secondary_color,
			color: colors.primary_highlight_color,
			fontWeight: 'bold'
		}
	} else {
		return {
			color: colors.light_font_color,
			background: colors.secondary_color,
		}
	}
}

export const getSetButtonStyles = (colors: ComponentTheme) => ({
	color: colors.secondary_highlight_color,
	'--year-edit-hover-color': colors.primary_color,
	'--year-edit-hover-bg-color': colors.secondary_highlight_color
})