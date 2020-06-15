import React from 'react';
import {range} from 'lodash'

import { MainTime } from "../interfaces/timepicker.interfaces";

import styles from '../styles/timepicker.css'


interface ClockFaceProps extends MainTime {
	onTimeUpdate : ({}:MainTime) => void
}

// making inline css due to problem with css modules on production build
const CLOCK_SIZE = 16 // em
const CLOCK_HAND_HEIGHT = 1.8 // em

export default ({hour, minute, meridiem, onTimeUpdate} : ClockFaceProps) => {
	const clock_tick_list: number[] = range(1, 13)
	const hand_position = (CLOCK_SIZE / 2) + (CLOCK_HAND_HEIGHT / 2 )

	return (
		<div className={styles.clockface} >
			<div className={styles.clock}>

				<ClockHands hour={hour} minute={minute} />

				{ // draw clock hands
				clock_tick_list.map((tick) => {
					const curr_minute = tick === 12 ? 0 : (tick * 5)
					let rotation = tick === 12 ? 0 : tick * 30
					// adjust hands so 12 O'clock is at the top rather than at 3 O'clock
					rotation -= 90
					// is current tick active ?
					const hh_class = tick === hour ? styles.hh_active : styles.hh
					const mm_class = curr_minute === minute ? styles.mm_active : styles.mm

					return (
						<div className={styles.hand_wrapper} key={tick} 
							style={{
								transform:`rotate(${rotation}deg)`,
								left:`${hand_position}em`
							}} >

							<div className={mm_class} style={{transform:`rotate(${-rotation}deg)`}}
								onClick={() => onTimeUpdate({hour, meridiem, minute:curr_minute})}>
								{curr_minute}
							</div>

							<div className={hh_class} style={{transform:`rotate(${-rotation}deg)`}}
								onClick={() => onTimeUpdate({minute, meridiem, hour:tick})}>
								{tick}
							</div>

						</div>
					)
				})}

			</div>
			<div className={`${meridiem==='AM' ? 
				styles.meridiem_active : styles.meridiem} ${styles.meridiem_am}`}
				onClick={() => onTimeUpdate({hour, minute, meridiem:"AM"})} >AM</div>

			<div className={`${meridiem==='PM' ? 
				styles.meridiem_active : styles.meridiem} ${styles.meridiem_pm}`}
				onClick={() => onTimeUpdate({hour, minute, meridiem:"PM"})} >PM</div>
		</div>
	)
}

const ClockHands = ({hour, minute}:any) => {
	const mm_rotation = ((minute / 5) * 30) - 90
	const hh_rotation = hour === 12 ? -90 : (hour * 30) - 90

	const hand_position = (CLOCK_SIZE / 2) + (CLOCK_HAND_HEIGHT / 2 )

	return (
		<React.Fragment>
			<div className={styles.mm_hand} 
				style={{
					transform:`rotate(${mm_rotation}deg)`,
					top : `${hand_position}em`,
					left : `${hand_position}em`
				}} ></div>
			<div className={styles.hh_hand} 
				style={{
					transform:`rotate(${hh_rotation}deg)`,
					top : `${hand_position}em`,
					left : `${hand_position}em`
				}} ></div>
		</React.Fragment>
	)
}