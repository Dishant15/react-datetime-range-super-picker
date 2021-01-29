import { ComponentTheme, InlineCssStyles } from '../interfaces/style.interfaces';

export const getCalenderCellColors = (
	colors:ComponentTheme, cell_type:string
) : InlineCssStyles => {
	if(cell_type === 'border') {
		return {
			'borderBottomColor': colors.secondary_highlight_color,
			'borderBottomStyle': 'solid',
			'borderBottomWidth': '1px',
			'borderTopColor': colors.secondary_highlight_color,
			'borderTopStyle': 'solid',
			'borderTopWidth': '1px',
			color: colors.secondary_highlight_color,
			'--calender-cell-hover-color': colors.primary_color,
			'--calender-cell-hover-bg-color': colors.secondary_highlight_color,
		}
	}
	else if(cell_type === 'solid') {
		return {
			background: colors.secondary_highlight_color,
			color: colors.primary_color,
			'--calender-cell-hover-color': colors.primary_color,
			'--calender-cell-hover-bg-color': colors.secondary_highlight_color,
		}
	} else { // normal cell color style
		return {
			color: colors.secondary_highlight_color,
			'--calender-cell-hover-color': colors.primary_color,
			'--calender-cell-hover-bg-color': colors.secondary_highlight_color,
		}
	}
}

export const getWrapperStyles = (colors: ComponentTheme) => ({
	background: colors.primary_color,
	color: colors.primary_font_color
})