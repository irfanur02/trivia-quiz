import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Button from '../components/Button'

export default function FormLogin() {
	const navigate = useNavigate()

	const [form, setForm] = useState({
    username: '',
    password: ''
  })

  const [warningUsername, setWarningUsername] = useState({
    warning: false,
    text: ''
  });

	const [warningPassword, setWarningPassword] = useState({
    warning: false,
    text: ''
  });

  function handleChange(e) {
    const { name, value } = e.target

	  setForm(prev => ({
	    ...prev,
	    [name]: value
	  }))

	  if (name === 'username') {
	    setWarningUsername({
	      warning: !value,
	      text: !value ? 'Username tidak boleh kosong' : ''
	    })
	  }

	  if (name === 'password') {
	    setWarningPassword({
	      warning: !value,
	      text: !value ? 'Password tidak boleh kosong' : ''
	    })
	  }
  }

  function warningFormLogin() {
  	const usernameWarning = !form.username
	  const passwordWarning = !form.password

	  setWarningUsername({
	    warning: usernameWarning,
	    text: usernameWarning ? 'Username tidak boleh kosong' : ''
	  })

	  setWarningPassword({
	    warning: passwordWarning,
	    text: !form.password ? 'Password tidak boleh kosong' : ''
	  })

	  return usernameWarning || passwordWarning
  }

  function warningValidasiLogin(usernameWarning, passwordWarning) {
  	setWarningUsername({
	    warning: usernameWarning,
	    text: usernameWarning ? 'Username belum terdaftar' : ''
	  })

	  setWarningPassword({
	    warning: passwordWarning,
	    text: passwordWarning ? 'Password tidak sesuai' : ''
	  })
  }

  function validasiLogin(users) {
	  let usernameWarning = false
	  let passwordWarning = false
	  let user = null

	  if (!Array.isArray(users)) {
	    usernameWarning = true
	  } else {
	    user = users.find(u => u.username === form.username)

	    if (!user) {
	      usernameWarning = true
	    } else if (user.password !== form.password) {
	      passwordWarning = true
	    }
	  }

	  warningValidasiLogin(usernameWarning, passwordWarning)

	  return !usernameWarning && !passwordWarning
	}


	function handleSubmit(e) {
    e.preventDefault()

    const hasWarning = warningFormLogin()

    if(!hasWarning) {
	    const users = JSON.parse(localStorage.getItem('userRegister')) || []

		  const isValidLogin = validasiLogin(users)

		  if (isValidLogin) {
		    navigate('/play-test')
		  }
    }
  }

	return(
		<>
			<div className="flex flex-col gap-3 mt-10">
				<form onSubmit={handleSubmit} className="flex flex-col gap-2">
					<div>
						<input 
							className="border-1 border-black w-full p-3 bg-gray-300 rounded-lg" 
							placeholder="Username" 
							name="username" 
							value={form.username}
	          	onChange={handleChange} />
          	{warningUsername.warning && (
        			<span className="text-red-300 block">{warningUsername.text}</span>
          	)}
					</div>
					<div>
						<input 
							className="border-1 border-black w-full p-3 bg-gray-300 rounded-lg" 
							placeholder="Password" 
							type="password" 
							name="password" 
							value={form.password}
	          	onChange={handleChange} />
	          {warningPassword.warning && (
        			<span className="text-red-300 block">{warningPassword.text}</span>
          	)}
          </div>
					<Button text="Login" variant="main" w="full" type="submit" />
				</form>
				<Button text="Kembali" variant="white" w="full" onClick={() => navigate('/')} />
			</div>
		</>
	)
}