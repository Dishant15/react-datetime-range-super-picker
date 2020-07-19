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

const DARK_THEME_COLORS:ComponentTheme = {
	primary_color : '#36465D',
	primary_font_color : '#8897b9',
	light_font_color : '#8897b9',
	
	secondary_color: '#2B303B',
	other_color: '#2b303b',

	primary_highlight_color: '#CDB274',
	secondary_highlight_color: 'rgba(165,201,213,.61)',
}

export const getThemeColors = (theme = 'dark'):ComponentTheme => {
	switch (theme) {
		case 'light':
			return LIGHT_THEME_COLORS

		case 'dark':
			return DARK_THEME_COLORS
	
		default:
			return LIGHT_THEME_COLORS;
	}
}