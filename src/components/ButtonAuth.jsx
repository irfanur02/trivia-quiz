import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'

export default function ButtonAuth() {
	const navigate = useNavigate()
	
	return(
		<>
			<div className="flex flex-col gap-3 mt-10">
				<Button text="Login" variant="main" w="full" onClick={() => navigate('/formLogin')} />
				<Button text="Register" variant="secondary" w="full" onClick={() => navigate('/formRegister')} />
			</div>
		</>
	)
}