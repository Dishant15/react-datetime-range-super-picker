import React from 'react';
import {range} from 'lodash'

import { ClockFaceProps } from "../interfaces/timepicker.interfaces";

import styles from '../styles/timepicker.css'
import { getTickColors, getMeridiemStyles } from '../styles/clockface.colors';


// making inline css due to problem with css modules on production build
const CLOCK_SIZE = 16 // em
const CLOCK_HAND_HEIGHT = 1.8 // em

export default ({hour, minute, meridiem, onTimeUpdate, colors} : ClockFaceProps) => {
	const clock_tick_list: number[] = range(1, 13)
	const hand_position = (CLOCK_SIZE / 2) + (CLOCK_HAND_HEIGHT / 2 )

	const { meridiem_style, meridiem_active_style } = getMeridiemStyles(colors)

	return (
		<div className={styles.clockface} >
			<div className={styles.clock} 
				style={{ background: colors.secondary_color }}>

				<ClockHands hour={hour} minute={minute} colors={colors} />

				{ // draw clock hands
				clock_tick_list.map((tick) => {
					const curr_minute = tick === 12 ? 0 : (tick * 5)
					let rotation = tick === 12 ? 0 : tick * 30
					// adjust hands so 12 O'clock is at the top rather than at 3 O'clock
					rotation -= 90

					const { hh_style, mm_style} = getTickColors(
						colors, rotation, tick === hour, curr_minute === minute)

					return (
						<div className={styles.hand_wrapper} key={tick} 
							style={{
								transform:`rotate(${rotation}deg)`,
								left:`${hand_position}em`
							}} >

							<div className={styles.mm} style={mm_style}
								onClick={() => onTimeUpdate({hour, meridiem, minute:curr_minute})}>
								{curr_minute}
							</div>

							<div className={styles.hh} style={hh_style}
								onClick={() => onTimeUpdate({minute, meridiem, hour:tick})}>
								{tick}
							</div>

						</div>
					)
				})}

			</div>
			<div className={`${styles.meridiem} ${styles.meridiem_am}`}
				style={meridiem==='AM' ? meridiem_active_style : meridiem_style}
				onClick={() => onTimeUpdate({hour, minute, meridiem:"AM"})} >AM</div>

			<div className={`${styles.meridiem} ${styles.meridiem_pm}`}
				style={meridiem==='PM' ? meridiem_active_style : meridiem_style}
				onClick={() => onTimeUpdate({hour, minute, meridiem:"PM"})} >PM</div>
		</div>
	)
}

const ClockHands = ({hour, minute, colors}:any) => {
	const hasMin = !isNaN(Number(minute)) // isNaN will handle 0 boolean true problem
	const hasHour = !isNaN(Number(hour))
	const mm_rotation = hasMin ? ((minute / 5) * 30) - 90 : 0
	const hh_rotation = hasHour ? (hour === 12 ? -90 : (hour * 30) - 90) : 0

	const hand_position = (CLOCK_SIZE / 2) + (CLOCK_HAND_HEIGHT / 2 )

	return (
		<React.Fragment>
			{hasMin &&
				<div className={styles.mm_hand} 
				style={{
					transform:`rotate(${mm_rotation}deg)`,
					top : `${hand_position}em`,
					left : `${hand_position}em`,
					background: colors.primary_highlight_color
				}} ></div>
			}
			{hasHour &&
				<div className={styles.hh_hand} 
				style={{
					transform:`rotate(${hh_rotation}deg)`,
					top : `${hand_position}em`,
					left : `${hand_position}em`,
					background: colors.secondary_highlight_color
				}} ></div>
			}
		</React.Fragment>
	)
}