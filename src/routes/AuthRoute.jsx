import { Routes, Route } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import ButtonAuth from '../components/ButtonAuth'
import FormLogin from '../components/FormLogin'
import FormRegister from '../components/FormRegister'

export default function AuthRoute() {
	return(
		<>
			<Routes>
				<Route element={ <AuthLayout /> }>
					<Route index element={ <ButtonAuth /> } />
					<Route path="/formLogin" element={ <FormLogin /> } />
					<Route path="/formRegister" element={<FormRegister />} />
				</Route>
			</Routes>
		</>
	)
}