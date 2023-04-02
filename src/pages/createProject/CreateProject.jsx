import { useState, useEffect } from "react"
import Select from "react-select"
import { useNavigate } from "react-router-dom"
import { useCollection } from "../../hooks/useCollection"
import { timestamp } from "../../firebase/config"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useFirestore } from "../../hooks/useFirestore"

import Illustration from "../../assets/illustration-3.png"

const categories = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
]

const CreateProject = () => {
  const { addDocument, response } = useFirestore("projects")
  const { documents } = useCollection("users")
  const [users, setUsers] = useState([])
  const { user } = useAuthContext()
  const navigate = useNavigate()

  // form fields
  const [name, setName] = useState("")
  const [details, setDetails] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [category, setCategory] = useState("")
  const [assignedUsers, setAssignedUsers] = useState([])
  const [formError, setFormError] = useState(null)

  useEffect(() => {
    if (documents) {
      const options = documents.map((user) => {
        return { value: user, label: user.displayName }
      })
      setUsers(options)
    }
  }, [documents])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError(null)

    if (!category) {
      setFormError("Please select a project category")
      return
    }
    if (assignedUsers.length < 1) {
      setFormError("Please assign the project to at least 1 user")
      return
    }

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    }

    const assignedUsersList = assignedUsers.map((user) => {
      return {
        displayName: user.value.displayName,
        photoURL: user.value.photoURL,
        id: user.value.id,
      }
    })

    const project = {
      name,
      details,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy,
      assignedUsersList,
    }

    await addDocument(project)

    if (!response.error) {
      navigate("/")
    }
  }

  return (
    <div className="bg-neutral-100 flex-1 p-16">
      <h2 className="font-semibold text-3xl text-dark-grey mb-14">
        Create Project
      </h2>
      <div className="flex flex-col lg:flex-row justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col basis-3/4 gap-4 max-w-xl"
        >
          <label>
            <span className="form-label">Project name</span>
            <input
              type="text"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="form-input"
            />
          </label>
          <label>
            <span className="form-label">Project details</span>
            <textarea
              type="text"
              required
              onChange={(e) => setDetails(e.target.value)}
              value={details}
              className="form-input h-52"
            />
          </label>
          <label>
            <span className="form-label">Due date</span>
            <input
              type="date"
              required
              onChange={(e) => setDueDate(e.target.value)}
              value={dueDate}
              className="form-input"
            />
          </label>
          <label>
            <span className="form-label">Project category</span>
            <Select
              options={categories}
              onChange={(option) => setCategory(option)}
            />
          </label>
          <label>
            <span className="form-label">Assign to</span>
            <Select
              options={users}
              onChange={(option) => setAssignedUsers(option)}
              isMulti
            />
          </label>
          <button className="full-button-large bg-accent-green text-neutral-100 hover:bg-teal-700">
            Add project
          </button>
          {formError && <p className="error">{formError}</p>}
        </form>
        <img
          src={Illustration}
          alt="illustration"
          className="hidden 2xl:block max-w-2xl"
        />
      </div>
    </div>
  )
}

export default CreateProject
