import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useAuthContext } from "./hooks/useAuthContext"

import LandingPage from "./pages/landingPage/LandingPage"
import Login from "./pages/login/Login"
import Signup from "./pages/signup/Signup"
import Dashboard from "./pages/dashboard/Dashboard"
import ProjectDetails from "./pages/projectDetails/ProjectDetails"
import CreateProject from "./pages/createProject/CreateProject"
import Navbar from "./components/navbar/Navbar"
import Sidebar from "./components/sidebar/Sidebar"
import UsersSidebar from "./components/usersSidebar/UsersSidebar"

function App() {
  const { authIsReady, user } = useAuthContext()

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          {!user && <Navbar />}
          <div className="flex justify-between min-h-screen">
            {user && <Sidebar />}
            <Routes>
              <Route
                path="/"
                element={!user ? <LandingPage /> : <Navigate to="/dashboard" />}
              />
              <Route
                path="/dashboard"
                element={user ? <Dashboard /> : <Navigate to="/" />}
              />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/dashboard" />}
              />
              <Route
                path="/signup"
                element={!user ? <Signup /> : <Navigate to="/dashboard" />}
              />
              <Route
                path="/projects/:id"
                element={user ? <ProjectDetails /> : <Navigate to="/" />}
              />
              <Route
                path="/create"
                element={user ? <CreateProject /> : <Navigate to="/" />}
              />
            </Routes>
            {user && <UsersSidebar />}
          </div>
        </BrowserRouter>
      )}
    </div>
  )
}

export default App
