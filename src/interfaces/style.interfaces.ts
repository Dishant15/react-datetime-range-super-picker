import { CSSProperties } from "react"

export type ComponentThemeOptional = {
	primary_color?: string,
	primary_font_color?: string,
	light_font_color?: string,
	
	secondary_color?: string,
	other_color?: string,

	primary_highlight_color?: string,
	secondary_highlight_color?: string,
}

export type ComponentTheme = {
	primary_color: string,
	primary_font_color: string,
	light_font_color: string,
	
	secondary_color: string,
	other_color: string,

	primary_highlight_color: string,
	secondary_highlight_color: string,
}

export type InlineCssStyles = CSSProperties | { [key: string]: string }