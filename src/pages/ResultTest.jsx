import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'

export default function ResultTest({ handleReplayGame, result }) {
	const navigate = useNavigate()
	const correctCount = result.filter(item => item.answer === true).length;
	const wrongCount   = result.filter(item => item.answer === false).length;

	function handleReplayAndNavigateGame() {
		if (handleReplayGame) {
		  handleReplayGame();
		  navigate('/play-test')
		}
	}

	console.log(result)

	return(
		<>
			<section className="w-sm flex flex-col items-center text-[1.1rem]">
				<div className="w-full bg-gray-300 border-2 border-black-800 rounded-xl p-3 mb-3 text-center font-medium">
					<p>hasil perolehan</p>
					<p>benar <span className="font-medium text-red-600">{correctCount} soal</span>.</p>
					<p>salah <span className="font-medium text-red-600">{wrongCount} soal</span>.</p>
					<p>terjawab <span className="font-medium text-red-600">{result.length} soal dari 5 soal</span>.</p>
				</div>
				<Button text="Mulai Lagi" w="max" variant="red" onClick={handleReplayAndNavigateGame} />
			</section>
		</>
	)
}