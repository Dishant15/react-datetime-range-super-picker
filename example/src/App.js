import React from 'react'

import { TimePicker } from 'react-datetime-range-super-picker'
import 'react-datetime-range-super-picker/dist/index.css'

const App = () => {
	return (
		<TimePicker time={{hour24 : 22, minute : 30}} 
			format="HH:mm aaaa" onTimeUpdate={(time) => console.log(time)} />
	)
}

export default App
