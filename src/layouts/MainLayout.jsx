import { useState } from 'react'
import Timer from '../components/Timer'
import Pretest from '../pages/Pretest'
import Test from '../pages/Test'
import ResultTest from '../pages/ResultTest'

export default function MainLayout() {
	const [startTest, setStartTest] = useState(false)
	const [showResult, setShowResult] = useState(false)
	const [doneTest, setDoneTest] = useState(false)
	const [questionsReady, setQuestionsReady] = useState(false);
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
		setQuestionsReady(false);
		setAnswer([]);
	}

	function handleDoneTest() {
		setDoneTest(true);
	}

	function handleFetchingQuestions() {
		setLoading(true)
	}

	return (
		<>
			<main className="w-full h-screen bg-blue-900 grid place-content-center">
				{startTest && !doneTest && questionsReady && (
					<Timer 
						start={startTest}
					  duration={15}
					  onFinish={handleShowResult}
					/>)}

				{!startTest && !showResult && !doneTest && (
					<Pretest handleStartTest={handleStartTest} />)}

				{startTest && !showResult && !doneTest && (
					<Test 
						handleDoneTest={handleDoneTest} 
						setAnswer={setAnswer} 
						onQuestionsReady={() => setQuestionsReady(true)}
					/>)}

				{(showResult || doneTest) && (
					<ResultTest handleReplayGame={handleReplayGame} result={answer} />)}
			</main>
		</>
	)
}