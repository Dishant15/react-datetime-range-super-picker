import React from 'react'

import { TimePicker } from 'react-datetime-range-super-picker'
import 'react-datetime-range-super-picker/dist/index.css'

const App = () => {
	return (
		<div style={{marginTop:"150px"}}>
			<TimePicker time={{hour24 : 22, minute : 30}} 
				onTimeUpdate={(time) => console.log(time)} />
		</div>
	)
}

export default App
