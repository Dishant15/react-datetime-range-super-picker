import { ComponentTheme, InlineCssStyles } from '../interfaces/style.interfaces';

export const getTickColors = (
	colors:ComponentTheme, rotation:number, 
	is_hh_active:boolean, is_mm_active:boolean
) => {
	const active_hh_style:InlineCssStyles = {
		background : colors.secondary_highlight_color,
		color: colors.primary_color,
		'--hover-bg-color': colors.secondary_highlight_color,
		'--hover-color': colors.primary_color,
		'--font-rotation': `${-rotation}deg`,
	}
	
	const inactive_hh_style:InlineCssStyles = {
		'--hover-bg-color': colors.secondary_highlight_color,
		'--hover-color': colors.primary_color,
		'--font-rotation': `${-rotation}deg`,
	}
	
	const active_mm_style:InlineCssStyles = {
		background : colors.primary_highlight_color,
		color: colors.primary_color,
		'--hover-bg-color': colors.primary_highlight_color,
		'--hover-color': colors.primary_color,
		'--font-rotation': `${-rotation}deg`,
	}
	
	const inactive_mm_style:InlineCssStyles = {
		'--hover-bg-color': colors.primary_highlight_color,
		'--hover-color': colors.primary_color,
		'--font-rotation': `${-rotation}deg`,
	}

	const hh_style = is_hh_active ? active_hh_style : inactive_hh_style
	const mm_style = is_mm_active ? active_mm_style : inactive_mm_style

	return { hh_style, mm_style }
}

export const getMeridiemStyles = (colors:ComponentTheme) => {
	const meridiem_active_style = {
		'--hover-color' : colors.primary_color,
		'--hover-bg-color': colors.secondary_highlight_color,
		color : colors.primary_color,
		background: colors.secondary_highlight_color
	}

	const meridiem_style = {
		'--hover-color' : colors.primary_color,
		'--hover-bg-color': colors.secondary_highlight_color,
		background: colors.primary_color,
		color: colors.primary_font_color
	}
	return { meridiem_style, meridiem_active_style }
}