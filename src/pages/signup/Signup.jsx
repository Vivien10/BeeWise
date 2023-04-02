import { useState } from "react"
import { useSignup } from "../../hooks/useSignup"

import SignupIllustration from "../../assets/illustration-2.png"

const Signup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [thumbnail, setThumbnail] = useState(null)
  const [thumbnailError, setThumbnailError] = useState(null)
  const { signup, isPending, error } = useSignup()

  const handleSubmit = (e) => {
    e.preventDefault()
    signup(displayName, email, password, thumbnail)
  }

  const handleFileChange = (e) => {
    setThumbnail(null)
    let selected = e.target.files[0]

    if (!selected) {
      setThumbnailError("Please select a file")
      return
    }
    if (!selected.type.includes("image")) {
      setThumbnailError("Selected file must be an image")
      return
    }
    if (selected.size > 200000) {
      setThumbnailError("Image file size must be less than 200kb")
      return
    }

    setThumbnailError(null)
    setThumbnail(selected)
  }

  return (
    <div className="ml-auto mr-auto">
      <div className="flex flex-col lg:flex-row justify-center items-center gap-16 p-8">
        <div className="max-w-md md:max-w-lg lg:max-w-xl">
          <img src={SignupIllustration} alt="Project management illustration" />
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <h2 className="text-3xl font-semibold text-dark-grey">Sign up</h2>
          <label>
            <span className="form-label">Display name</span>
            <input
              type="text"
              required
              onChange={(e) => setDisplayName(e.target.value)}
              value={displayName}
              className="form-input"
            />
          </label>
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
          <label>
            <span className="form-label">Upload profile picture</span>
            <input
              type="file"
              required
              onChange={handleFileChange}
              className="form-input"
            />
          </label>
          {thumbnailError && <div className="error">{thumbnailError}</div>}
          {!isPending && (
            <button className="full-button-large text-dark-grey bg-amber-400 hover:bg-amber-500">
              Sign up
            </button>
          )}
          {isPending && (
            <button
              className="full-button-large text-dark-grey bg-neutral-300 text-color"
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

export default Signup
