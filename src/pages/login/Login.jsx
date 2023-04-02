import { useState } from "react"
import { useLogin } from "../../hooks/useLogin"

import LoginIllustration from "../../assets/illustration-3.png"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login, isPending, error } = useLogin()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }

  return (
    <div className="ml-auto mr-auto">
      <div className="flex flex-col lg:flex-row justify-center items-center gap-16 p-8">
        <div className="max-w-lg md:max-w-xl lg:max-w-2xl">
          <img src={LoginIllustration} alt="Project management illustration" />
        </div>
        <form className="flex flex-col gap-4 w-96" onSubmit={handleSubmit}>
          <h2 className="text-3xl font-semibold text-dark-grey">Sign in</h2>
          <label>
            <span className="form-label">E-mail</span>
            <input
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="form-input"
            />
          </label>
          <label>
            <span className="form-label">Password</span>
            <input
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="form-input"
            />
          </label>
          {!isPending && (
            <button className="full-button-large text-dark-grey bg-amber-400 hover:bg-amber-500">
              Sign in
            </button>
          )}
          {isPending && (
            <button
              className="full-button-large bg-neutral-300 text-dark-grey"
              disabled
            >
              Loading...
            </button>
          )}
        </form>
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  )
}

export default Login
