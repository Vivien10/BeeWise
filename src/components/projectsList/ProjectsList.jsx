import { Link } from "react-router-dom"

import Avatar from "../avatar/Avatar"

const ProjectsList = ({ projects }) => {
  return (
    <div className="grid grid-cols-card gap-5 text-dark-grey">
      {projects.length === 0 && <p className="error">No projects yet</p>}
      {projects.map((project) => (
        <Link
          to={`/projects/${project.id}`}
          key={project.id}
          className="bg-white p-6 rounded shadow"
        >
          <h4 className="text-lg font-medium">{project.name}</h4>
          <p className="text-sm text-neutral-500 border-b border-slate-200 pb-4">
            Due by {project.dueDate.toDate().toDateString()}
          </p>
          <div className="mt-5">
            <ul className="flex gap-4">
              {project.assignedUsersList.map((user) => (
                <li key={user.photoURL}>
                  <Avatar src={user.photoURL} />
                </li>
              ))}
            </ul>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default ProjectsList
