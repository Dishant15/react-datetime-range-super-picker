import React, { useState, useCallback } from 'react'
import { range } from 'lodash'

import { formatMonth } from "./utils";

import styles from './monthpicker.css'
import root_styles from '../root.css'

interface OutputShape {
	// 0 -> 11, 0 = Jan; 11 = Dec
	month : number,
	year : number
}

export interface MonthPickerProps extends OutputShape {
	onTimeUpdate : ({}:OutputShape) => void
}

export default ({month, year, onTimeUpdate}:MonthPickerProps) => {

	const [edit, setEdit] = useState(false)
	const [res_year, setYear] = useState(year)
	const [res_month, setMonth] = useState(month)

	// crousel scroll in em
	const pos_change_delta = 13.8
	const [m_pos, setMPos] = useState(-Math.floor(res_month/3) * pos_change_delta)

	const handleTimeChange = useCallback((new_time : OutputShape) => {
		setYear(new_time.year)
		setMonth(new_time.month)
		setEdit(false)
		onTimeUpdate(new_time)
	}, [])

	// change direction : 1 : increment , 0 : decrement
	const handleMonthPosChange = useCallback((change_dir:number) => {
		if(change_dir) {
			const next_pos = m_pos + pos_change_delta
			if(next_pos < 0) setMPos(next_pos)
		} else {
			const next_pos = m_pos - pos_change_delta
			if(next_pos > -42) setMPos(next_pos)
		}
	}, [m_pos])

	const month_list = range(0, 12)

	return (
		<div className={styles.wrapper}>
			{edit ?
				<div className={styles.year_edit}>
					<input placeholder="Year ( YYYY )" 
						value={res_year} 
						onChange={(e) => setYear(Number(e.target.value))} />

					<div onClick={() => handleTimeChange({month : res_month, year : res_year})}>
						Done
					</div>
				</div>
			:
				<div className={styles.year_show} onClick={() => setEdit(true)}>
					{res_year} {formatMonth(res_month, 'MMMM')}
				</div>
			}

			<div className={styles.month_wrapper} >
				<div onClick={() => handleMonthPosChange(1)}
						className={[styles.crousel_btns, root_styles.no_select].join(' ')}> &lt; </div>

				<div className={styles.month_pill_wrapper}>
					<div className={styles.month_pill_crousel} style={{transform:`translateX(${m_pos}em)`}}>

						{month_list.map((curr_month) => {

							const m_class = (curr_month === res_month) ?
								styles.month_pill_active : styles.month_pill

							return (
								<div className={m_class} key={curr_month}
									onClick={() => handleTimeChange({year:res_year, month:curr_month})} >
									{formatMonth(curr_month, "MMM")}
								</div>
							)
						})}

					</div>
				</div>

				<div onClick={() => handleMonthPosChange(0)}
						className={[styles.crousel_btns, root_styles.no_select].join(' ')}> &gt; </div>
			</div>
		</div>
	)
}