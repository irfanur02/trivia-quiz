import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'

export default function FormRegister() {
	const navigate = useNavigate()
	
	return(
		<>
			<div className="flex flex-col gap-3 mt-10">
				<input className="border-1 border-black w-full p-3 bg-gray-300 rounded-lg" placeholder="Username" />
				<input className="border-1 border-black w-full p-3 bg-gray-300 rounded-lg" placeholder="Password" />
				<Button text="Register" variant="main" w="full" onClick={() => navigate('/formLogin')} />
				<Button text="Kembali" variant="white" w="full" onClick={() => navigate('/')} />
			</div>
		</>
	)
}