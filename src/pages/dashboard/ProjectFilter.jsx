const filterList = [
  "all",
  "assigned to me",
  "development",
  "design",
  "sales",
  "marketing",
]

const ProjectFilter = ({ currentFilter, changeFilter }) => {
  const filterProjects = (newFilter) => {
    changeFilter(newFilter)
  }

  return (
    <div className="mb-10">
      <nav className="bg-white p-4 rounded">
        <span className="mr-6 font-medium uppercase">Filter by:</span>
        {filterList.map((filter) => (
          <button
            key={filter}
            onClick={() => filterProjects(filter)}
            className={`mr-6 px-3 rounded hover:bg-amber-100 transition ease-in duration-100 ${
              currentFilter === filter ? "bg-amber-100" : ""
            }`}
          >
            {filter}
          </button>
        ))}
      </nav>
    </div>
  )
}

export default ProjectFilter
