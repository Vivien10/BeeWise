import { useState } from "react"
import { useCollection } from "../../hooks/useCollection.js"

import Avatar from "../avatar/Avatar.jsx"

const UsersSidebar = () => {
  const { error, documents } = useCollection("users")

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
        <h2 className="font-semibold text-3xl text-dark-grey mb-14">Users</h2>
        {error && <div className="error">{error}</div>}
        {documents &&
          documents.map((user) => (
            <div key={user.id} className="flex items-center gap-4 mb-5">
              <Avatar src={user.photoURL} />
              <span>{user.displayName}</span>
              {user.online && (
                <span className="w-2 aspect-square rounded-full bg-green-600"></span>
              )}
            </div>
          ))}
      </div>
      <button
        onClick={toggleSidebar}
        className="absolute top-0 -left-14 bg-white shadow-users-sidebar-label py-2 px-4 rounded-l hover:bg-amber-100 transition ease-in duration-100"
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
            d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
          />
        </svg>
      </button>
    </div>
  )
}

export default UsersSidebar
