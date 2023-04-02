import { useState } from "react"
import { NavLink, Link } from "react-router-dom"
import { useLogout } from "../../hooks/useLogout"
import { useAuthContext } from "../../hooks/useAuthContext"

import LogoLine from "../../assets/Beewise_LOGO_LINE.png"
import LogoutIcon from "../../assets/logout.svg"
import AddIcon from "../../assets/add.svg"
import DashboardIcon from "../../assets/dashboard.svg"

const Sidebar = () => {
  const { logout, isPending } = useLogout()
  const { user } = useAuthContext()

  const [showSidebar, setShowSidebar] = useState(true)

  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev)
  }

  return (
    <div className="relative">
      <div
        className={`p-8 w-72 bg-white h-screen ${
          showSidebar ? "block" : "hidden"
        }`}
      >
        <div className="mb-12 ml-auto mr-auto w-52">
          <Link to="/">
            <img src={LogoLine} alt="BeeWise Logo" />
          </Link>
        </div>
        <div className="flex flex-col items-center gap-2 pb-12 border-b border-slate-200">
          <img
            src={user.photoURL}
            alt="user avatar"
            className="w-24 aspect-square rounded-full object-cover"
          />
          <p className="text-lg font-medium text-dark-grey">
            Hello, {user.displayName}!
          </p>
          {!isPending && (
            <button className="flex items-center" onClick={logout}>
              <img src={LogoutIcon} alt="Logout icon" className="w-4 mr-1" />
              <span className="font-medium text-rose-500 text-sm">Logout</span>
            </button>
          )}
          {isPending && (
            <button className="flex items-center" disabled>
              <img src={LogoutIcon} alt="Logout icon" className="w-4 mr-1" />
              <span className="font-medium text-dark-grey text-sm">
                Logging out...
              </span>
            </button>
          )}
        </div>
        <nav className="mt-12">
          <ul>
            <li>
              <NavLink
                to="/dashboard"
                className="flex items-center p-2 mb-4 rounded sidebar-link"
              >
                <img
                  src={DashboardIcon}
                  alt="dashboard icon"
                  className="w-5 mr-2"
                />
                <span className="font-medium text-dark-grey">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/create"
                className="flex items-center p-2 mb-4 rounded sidebar-link"
              >
                <img src={AddIcon} alt="dashboard icon" className="w-5 mr-2" />
                <span className="font-medium text-dark-grey">New Project</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <button
        onClick={toggleSidebar}
        className="absolute top-0 -right-14 bg-white shadow-sidebar-label py-2 px-4 rounded-r hover:bg-amber-100 transition ease-in duration-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
    </div>
  )
}

export default Sidebar
