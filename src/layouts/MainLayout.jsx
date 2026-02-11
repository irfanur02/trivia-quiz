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
	const [answers, setAnswers] = useState([]);
	const [questions, setQuestions] = useState([]);
	const [recentTimeLeft, setRecentTimeLeft] = useState(15);
	const [indexQuestionContinueTest, setIndexQuestionContinueTest] = useState();

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
		setAnswers([]);
	}

	function handleDoneTest() {
		setDoneTest(true);
	}

	function handleFetchingQuestions() {
		setLoading(true)
	}

	function saveTimeLeft(time) {
		setRecentTimeLeft(time)
	}

	function questionCount() {
		return questions.length
	}

	function questionSet(data) {
		setQuestions(data)
	}

	function questionGet(index) {
		return questions[index]
	}

	function continueTestIndex() {
		const userActive = JSON.parse(sessionStorage.getItem('token'))[0].username
		const answersUsers = JSON.parse(localStorage.getItem('answerUsers')) ?? false
		if (!answersUsers) return 0

		const continueUserTest = answersUsers.find(u => u.username === userActive)
		console.log(continueUserTest ? true : false)
		if (continueUserTest) {
			return JSON.parse(localStorage.getItem('answerUsers'))[0].answers.length
		} else {
			return 0
		}
	}

	function continueAnswerUser() {
		const userActive = JSON.parse(sessionStorage.getItem('token'))[0].username
		const answersUsers = JSON.parse(localStorage.getItem('answerUsers')) ?? false
		if (!answersUsers) return 0

		const continueUserTest = answersUsers.find(u => u.username === userActive)
		if (continueUserTest) {
			return JSON.parse(localStorage.getItem('answerUsers'))[0].answers
		} else {
			return 0
		}
	}

	function continueTimeLeftUser() {
		const userActive = JSON.parse(sessionStorage.getItem('token'))[0].username
		const answersUsers = JSON.parse(localStorage.getItem('answerUsers')) ?? false
		// if (!answersUsers) return console.log(15)
		if (!answersUsers) return recentTimeLeft

		const continueUserTest = answersUsers.find(u => u.username === userActive)
		if (continueUserTest) {
			// return JSON.parse(localStorage.getItem('answerUsers'))[0].timeLeft
			setRecentTimeLeft(JSON.parse(localStorage.getItem('answerUsers'))[0].timeLeft)
			return recentTimeLeft
		} else {
			return 0
		}
	}

	function handleLogout() {
		saveTimeLeft(recentTimeLeft)
		if (startTest) {
			const pauseTest = JSON.parse(localStorage.getItem('answerUsers')) || []
			const users = JSON.parse(localStorage.getItem('users'))
			const userActive = JSON.parse(sessionStorage.getItem('token'))[0].username
			const userTest = pauseTest.find(u => u.username === userActive)
			pauseTest.push({
		    username: userActive,
		    answers: answers,
		    questions: questions,
		    timeLeft: recentTimeLeft
		  })
			localStorage.setItem('answerUsers', JSON.stringify(pauseTest))
			
			console.log(userTest)
			console.log(pauseTest)
		}

		sessionStorage.removeItem('token') // session login
		navigate('/', { replace: true });

	}

	return (
		<>
			{/*{continueTimeLeftUser()}*/}
			<main className="w-full h-screen bg-blue-900 flex flex-col items-center">
				<nav className="w-full flex justify-between items-center bg-red p-3 bg-blue-950 shadow-xl/20">
					<h5 className="font-bold text-[1.5rem] text-white text-center text-shadow-lg/30">TRIVIA QUIZ</h5>
					<Button text="Keluar" w="max" variant="main" onClick={handleLogout} />
				</nav>
				<div className="h-full grid place-content-center">
					{startTest && !doneTest && questionsReady && (
						<Timer 
							start={startTest}
						  duration={() => continueTimeLeftUser()}
						  saveTimeLeft={saveTimeLeft}
						  onFinish={handleShowResult}
						/>)}

					{!startTest && !showResult && !doneTest && (
						<Pretest handleStartTest={handleStartTest} />)}

					{startTest && !showResult && !doneTest && (
						<Test 
							handleDoneTest={handleDoneTest} 
							setAnswer={setAnswers} 
							onQuestionsReady={() => setQuestionsReady(true)}
							questionCount={questionCount}
							questionSet={questionSet}
							questionGet={questionGet}
							indexQuestionContinueTest={continueTestIndex()}
							answersGet={continueAnswerUser}
						/>)}

					{(showResult || doneTest) && (
						<ResultTest handleReplayGame={handleReplayGame} result={answers} />)}
				</div>
			</main>
		</>
	)
}