import { useNavigate } from 'react-router-dom'
import { useState	} from'react'
import Button from '../components/Button'

export default function FormRegister() {
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
	      warning: !value || value.length < 6,
	      text: !value
	        ? 'Password tidak boleh kosong'
	        : value.length < 6
	          ? 'Password minimal 6 karakter'
	          : ''
	    })
	  }
  }

  function warningFormRegister() {
	  const usernameWarning = !form.username
	  const passwordWarning = !form.password || form.password.length < 6

	  setWarningUsername({
	    warning: usernameWarning,
	    text: usernameWarning ? 'Username tidak boleh kosong' : ''
	  })

	  setWarningPassword({
	    warning: passwordWarning,
	    text: !form.password
				      ? 'Password tidak boleh kosong'
				      : passwordWarning
				        ? 'Password minimal 6 karakter'
				        : ''
	  })

	  return usernameWarning || passwordWarning
	}

	function warningValidasiRegister() {
	  setWarningUsername({
	    warning: true,
	    text: 'Username sudah terdaftar'
	  })
	}

	function validasiRegister(users, username) {
		if (users === 0) return false

		const isRegistered = users.some(u => u.username === username)

		if (isRegistered) {
			warningValidasiRegister()
		}

		return isRegistered
	}

	function handleSubmit(e) {
    e.preventDefault()

    const hasWarning = warningFormRegister()

	  if (!hasWarning) {
	    const users = JSON.parse(localStorage.getItem('userRegister')) || []
	    const username = form.username

	    const hasUserRegistered = validasiRegister(users, username)

	    if (!hasUserRegistered) {
		    users.push({
		      username: form.username,
		      password: form.password
		    })

		    localStorage.setItem(
		      'userRegister',
		      JSON.stringify(users)
		    )

		    navigate('/login')
	    }

	  }
  }
	
	return(
		<>
			<div className="flex flex-col gap-4 mt-10">
				<form onSubmit={handleSubmit} className="flex flex-col gap-2">
					<div>
						<input 
							className="border-1 border-black w-full p-3 bg-gray-300 rounded-lg" 
							placeholder="Username" 
							autoComplete="off"
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
							autoComplete="off"
							type="password" 
							name="password" 
							value={form.password}
	          	onChange={handleChange} />
	          {warningPassword.warning && (
        			<span className="text-red-300 block">{warningPassword.text}</span>
          	)}
          </div>
					<Button text="Register" variant="main" w="full" type="submit" />
				</form>
				<Button text="Kembali" variant="white" w="full" onClick={() => navigate('/')} />
			</div>
		</>
	)
}