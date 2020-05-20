import { format } from "date-fns";

export const formatMonth = (month:number, str_format:string = 'MMM'):string => {
	const now = new Date()
	now.setMonth(month)
	return format(now, str_format)
}