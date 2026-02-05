import { useState } from 'react'
import Timer from '../components/Timer'
import Pretest from '../components/Pretest'
import Test from '../components/Test'
import ResultTest from '../components/ResultTest'

export default function MainLayout() {
	const [startTest, setStartTest] = useState(false)

	function handleStartTest() {
		setStartTest(true)
	}

	return (
		<>
			<main className="w-full h-screen bg-blue-900 grid place-content-center">
				<Timer />
				{!startTest && (<Pretest handleStartTest={handleStartTest} />)}
				{startTest && (<Test />)}
				{/*<ResultTest />*/}
			</main>
		</>
	)
}