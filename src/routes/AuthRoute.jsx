import { Routes, Route } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import ButtonAuth from '../components/ButtonAuth'
import FormLogin from '../pages/FormLogin'
import FormRegister from '../pages/FormRegister'

export default function AuthRoute() {
	return(
		<>
			<Routes>
				<Route element={ <AuthLayout /> }>
					<Route index element={ <ButtonAuth /> } />
					<Route path="/login" element={ <FormLogin /> } />
					<Route path="/register" element={<FormRegister />} />
				</Route>
			</Routes>
		</>
	)
}