import { useState } from "react"
import { timestamp } from "../../firebase/config"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useFirestore } from "../../hooks/useFirestore"
import uuid from "react-uuid"
import formatDistanceToNow from "date-fns/formatDistanceToNow"

import Avatar from "../../components/avatar/Avatar"

const ProjectComments = ({ project }) => {
  const [newComment, setNewComment] = useState("")
  const { user } = useAuthContext()
  const { updateDocument, response } = useFirestore("projects")

  const handleSubmit = async (e) => {
    e.preventDefault()

    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: timestamp.fromDate(new Date()),
      id: uuid(),
    }

    await updateDocument(project.id, {
      comments: [commentToAdd, ...project.comments],
    })

    if (!response.error) {
      setNewComment("")
    }
  }

  return (
    <div>
      <h4 className="text-xl font-medium mb-7">Comments</h4>
      <form className="flex gap-4 items-stretch mb-7" onSubmit={handleSubmit}>
        <input
          onChange={(e) => setNewComment(e.target.value)}
          value={newComment}
          type="text"
          required
          placeholder="Add comment:"
          className="border border-neutral-300 rounded w-full py-2 px-4 text-dark-grey"
        ></input>
        <button className="full-button-large text-dark-grey bg-accent-yellow hover:bg-amber-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </button>
      </form>
      <div>
        {project.comments.length > 0 &&
          project.comments.map((comment) => (
            <div
              key={comment.id}
              className="border-b border-slate-300 last:border-neutral-100 px-2 py-6"
            >
              <div className="flex items-center gap-2">
                <Avatar src={comment.photoURL} />
                <span className="font-medium">{comment.displayName}</span>
              </div>
              <p className="mt-2 mb-2 text-neutral-700">{comment.content}</p>
              <p className="text-xs text-neutral-500">
                {formatDistanceToNow(comment.createdAt.toDate(), {
                  addSuffix: true,
                })}
              </p>
            </div>
          ))}
      </div>
    </div>
  )
}

export default ProjectComments
