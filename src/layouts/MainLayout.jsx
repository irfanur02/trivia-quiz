import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Timer from '../components/Timer'
import Button from '../components/Button'
import Pretest from '../pages/Pretest'
import Test from '../pages/Test'
import ResultTest from '../pages/ResultTest'

export default function MainLayout() {
	const navigate = useNavigate()
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

	function handleLogout() {
		sessionStorage.removeItem('token')
		navigate('/', { replace: true });
	}

	return (
		<>
			<main className="w-full h-screen bg-blue-900 flex flex-col items-center">
				<nav className="w-full flex justify-between items-center bg-red p-3 bg-blue-950 shadow-xl/20">
					<h5 className="font-bold text-[1.5rem] text-white text-center text-shadow-lg/30">TRIVIA QUIZ</h5>
					<Button text="Keluar" w="max" variant="main" onClick={handleLogout} />
				</nav>
				<div className="h-full grid place-content-center">
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
				</div>
			</main>
		</>
	)
}