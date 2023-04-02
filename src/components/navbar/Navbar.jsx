import { Link } from "react-router-dom"

import LogoColoured from "../../assets/Beewise_LOGO.png"

const Navbar = () => {
  return (
    <header className="bg-gradient-to-r from-amber-100 to-amber-300 p-4">
      <div className="flex justify-between">
        <div className="w-20">
          <Link to="/">
            <img src={LogoColoured} alt="BeeWise logo" />
          </Link>
        </div>
        <div className="flex items-center gap-8">
          <button className="link-button text-dark-grey hover:underline underline-offset-2">
            <Link to="/login">Sign in</Link>
          </button>
          <button className="full-button-small bg-accent-green text-neutral-100 hover:bg-teal-700">
            <Link to="/signup">Sign up</Link>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
