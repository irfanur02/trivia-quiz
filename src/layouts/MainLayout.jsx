import { useState } from 'react'
import Timer from '../components/Timer'
import Pretest from '../pages/Pretest'
import Test from '../pages/Test'
import ResultTest from '../pages/ResultTest'

export default function MainLayout() {
	const [startTest, setStartTest] = useState(false)
	const [showResult, setShowResult] = useState(false)
	const [doneTest, setDoneTest] = useState(false)
	const [answer, setAnswer] = useState([]);

	function handleStartTest() {
		setStartTest(true)
	}

	function handleShowResult() {
		setShowResult(true)
		setStartTest(false)
	}

	function handleReplayGame() {
		setShowResult(false)
		setStartTest(false)
		setDoneTest(false);
		setAnswer([]);
	}

	function handleDoneTest() {
		setDoneTest(true);
	}

	return (
		<>
			<main className="w-full h-screen bg-blue-900 grid place-content-center">
				{startTest && !doneTest && (
					<Timer 
						start={startTest}
					  duration={15}
					  onFinish={handleShowResult}
					/>)}

				{!startTest && !showResult && !doneTest && (
					<Pretest handleStartTest={handleStartTest} />)}

				{startTest && !showResult && !doneTest && (
					<Test handleDoneTest={handleDoneTest} setAnswer={setAnswer} />)}

				{(showResult || doneTest) && (
					<ResultTest handleReplayGame={handleReplayGame} result={answer} />)}
			</main>
		</>
	)
}