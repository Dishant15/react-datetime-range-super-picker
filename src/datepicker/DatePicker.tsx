import React from 'react';

import MonthPicker from "../monthpicker/MonthPicker";

import styles from './datepicker.css'


export default () => {
	return (
		<div className={styles.wrapper}>
			<MonthPicker month={2} year={2020} onTimeUpdate={() => {}} />
		</div>
	)
}