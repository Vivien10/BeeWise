import { useState } from "react"
import { useCollection } from "../../hooks/useCollection"
import { useAuthContext } from "../../hooks/useAuthContext"

import ProjectsList from "../../components/projectsList/ProjectsList"
import ProjectFilter from "./ProjectFilter"

const Dashboard = () => {
  const [currentFilter, setCurrentFilter] = useState("all")
  const { documents, error } = useCollection("projects", null, [
    "createdAt",
    "asc",
  ])
  const { user } = useAuthContext()

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter)
  }

  const projects = documents
    ? documents.filter((document) => {
        switch (currentFilter) {
          case "all":
            return true
          case "assigned to me":
            let assignedToMe = false
            document.assignedUsersList.forEach((u) => {
              if (user.uid === u.id) {
                assignedToMe = true
              }
            })
            return assignedToMe
          case "development":
          case "design":
          case "sales":
          case "marketing":
            return document.category === currentFilter
          default:
            return true
        }
      })
    : null

  return (
    <div className="bg-neutral-100 flex-1 p-16">
      <h2 className="font-semibold text-3xl text-dark-grey mb-7">Dashboard</h2>
      {documents && (
        <ProjectFilter
          currentFilter={currentFilter}
          changeFilter={changeFilter}
        />
      )}
      {error && <p className="error">{error}</p>}
      {projects && <ProjectsList projects={projects} />}
    </div>
  )
}

export default Dashboard
