import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'

export default function Pretest({ handleStartTest }) {
	const navigate = useNavigate()

	return(
		<>
			<section className="w-sm flex flex-col items-center text-[1.1rem]">
				<div className="w-full bg-gray-300 border-2 border-black-800 rounded-xl p-3 mb-3 text-center font-medium">
					<p>jumlah hanya <span className="font-medium text-red-600">5 soal</span>.</p>
					<p>pengerjaan quiz hanya <span className="font-medium text-red-600">10 detik</span>.</p>
					<p>kerjakan dengan tenang dan fokus.</p>
					<br />
					<p>waktu dimulai, setelah menekan tombol mulai</p>
				</div>
				<Button text="Mulai" w="max" variant="red" onClick={handleStartTest} />
			</section>
		</>
	)
}