import { useParams } from "react-router-dom"
import { useDocument } from "../../hooks/useDocument.js"

import ProjectSummary from "./ProjectSummary.jsx"
import ProjectComments from "./ProjectComments.jsx"

const ProjectDetails = () => {
  const { id } = useParams()
  const { document, error } = useDocument("projects", id)

  if (error) {
    return (
      <div className="bg-neutral-100 flex-1 p-8">
        <p className="error">{error}</p>
      </div>
    )
  }
  if (!document) {
    return (
      <div className="bg-neutral-100 flex-1 px-8 py-14">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="bg-neutral-100 flex-1 p-16">
      <div className="max-w-3xl">
        <h2 className="font-semibold text-3xl text-dark-grey mb-14">
          Project details
        </h2>
        <ProjectSummary project={document} />
        <ProjectComments project={document} />
      </div>
    </div>
  )
}

export default ProjectDetails
