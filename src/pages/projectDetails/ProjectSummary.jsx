import { useNavigate } from "react-router-dom"
import { useFirestore } from "../../hooks/useFirestore.js"
import { useAuthContext } from "../../hooks/useAuthContext"

import Avatar from "../../components/avatar/Avatar"

const ProjectSummary = ({ project }) => {
  const { deleteDocument } = useFirestore("projects")
  const { user } = useAuthContext()
  const navigate = useNavigate()

  const completeProject = (e) => {
    deleteDocument(project.id)
    navigate("/dashboard")
  }

  return (
    <div className="bg-white p-6 rounded shadow mb-14">
      <h4 className="text-lg font-medium">{project.name}</h4>
      <p className="text-sm text-neutral-500">
        Due by {project.dueDate.toDate().toDateString()}
      </p>
      <p className="text-sm pb-8">
        Created by{" "}
        <span className="font-medium bg-accent-yellow px-2 rounded">
          {project.createdBy.displayName}
        </span>
      </p>
      <p className="mt-8 mb-8 pb-8">{project.details}</p>
      <div className="flex justify-between items-end">
        <div>
          <p className="text-sm text-neutral-500 mb-4">Assinged to:</p>
          <ul className="flex gap-4">
            {project.assignedUsersList.map((user) => (
              <li key={user.photoURL}>
                <Avatar src={user.photoURL} />
              </li>
            ))}
          </ul>
        </div>
        {user.uid === project.createdBy.id && (
          <button
            onClick={completeProject}
            className="full-button-small bg-accent-green text-neutral-100 hover:bg-teal-700"
          >
            Mark as complete
          </button>
        )}
      </div>
    </div>
  )
}

export default ProjectSummary
