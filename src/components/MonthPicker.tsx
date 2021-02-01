import React, { useState, useCallback, useEffect } from 'react'
import { range, isNaN } from 'lodash'

import { formatMonth, getMonthAndYear } from "../utils/monthpicker.utils";
import { MonthPickerProps, OutputShape } from "../interfaces/monthpicker.interfaces";
import { getSetButtonStyles, getMonthPillColors } from "../styles/monthpicker.colors"

import styles from '../styles/monthpicker.css'



export default ({time=new Date(), colors, onDateUpdate}:MonthPickerProps) => {

	const {month, year} = getMonthAndYear(time)

	const [edit, setEdit] = useState(false)
	const [res_year, setYear] = useState(year)

	// crousel scroll in em
	const pos_change_delta = 13.8
	// calculate and set pos according to current selected month
	const [m_pos, setMPos] = useState(-Math.floor(month/3) * pos_change_delta)

	useEffect(() => {
		setMPos(-Math.floor(month/3) * pos_change_delta)
	}, [month])

	const handleTimeChange = useCallback((new_time : OutputShape) => {
		setYear(new_time.year)
		setEdit(false)
		if(onDateUpdate) onDateUpdate(new_time);
	}, [])

	// change direction : 1 : prev , 0 : next
	const handleMonthPosChange = useCallback((change_dir:number) => {
		if(change_dir) {
			// prev month is dec of last year
			if(month === 0) handleTimeChange({month: 11, year: year - 1})
			else if(month > 0) handleTimeChange({month : month - 1, year})
		} else {
			// next month is jan of next year
			if(month === 11) handleTimeChange({month: 0, year: year + 1})
			else if(month < 11) handleTimeChange({month : month + 1, year})
		}
	}, [month, year])

	const handleYearChange = useCallback((e) => {
		const new_year = Number(e.target.value)
		// validate year is a number
		if(!isNaN(new_year) && new_year < 9999) setYear(new_year)
	}, [])

	const month_list = range(0, 12)

	return (
		<div className={styles.wrapper} 
			style={{ background: colors.primary_color, color: colors.primary_font_color }}>
			{edit ?
				<div className={styles.year_edit}>
					<input placeholder="Year ( YYYY )" 
						value={res_year} className={styles.year_edit_input}
						onChange={handleYearChange} />

					<div className={styles.year_edit_submit}
						style={getSetButtonStyles(colors)} 
						onClick={() => handleTimeChange({month , year : res_year})}>
						Set
					</div>
				</div>
			:
				<div className={styles.year_show}
					style={{ color: colors.primary_highlight_color }}
					onClick={() => setEdit(true)}>
					{year} {formatMonth(month, 'MMMM')}
				</div>
			}

			<div className={styles.month_wrapper} >
				<div onClick={() => handleMonthPosChange(1)}
					style={{ color: colors.light_font_color }}
					className={styles.crousel_btns}> &lt; </div>

				<div className={styles.month_pill_wrapper}>
					<div className={styles.month_pill_crousel} style={{transform:`translateX(${m_pos}em)`}}>

						{month_list.map((curr_month) => {

							const m_styles = getMonthPillColors(colors, (curr_month === month))

							return (
								<div style={m_styles} className={styles.month_btn} key={curr_month}
									onClick={() => handleTimeChange({year:year, month:curr_month})} >
									{formatMonth(curr_month, "MMM")}
								</div>
							)
						})}

					</div>
				</div>

				<div onClick={() => handleMonthPosChange(0)}
					className={styles.crousel_btns}> &gt; </div>
			</div>
		</div>
	)
}