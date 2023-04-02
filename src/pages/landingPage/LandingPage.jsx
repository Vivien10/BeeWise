import { Link } from "react-router-dom"

import LandingIllustration from "../../assets/illustration-1.png"

const LandingPage = () => {
  return (
    <div className="ml-auto mr-auto">
      <main className="flex flex-col lg:flex-row p-8 items-center justify-center">
        <div className="mb-6 max-w-3xl lg:order-2">
          <img
            src={LandingIllustration}
            alt="Project management illustration"
          />
        </div>
        <div className="lg:order-1 max-w-lg">
          <h1 className="text-3xl md:text-5xl font-semibold text-dark-grey mb-5">
            Welcome to{" "}
            <span className="text-dark-grey block mt-5">BeeWise...</span>
          </h1>
          <p className="text-xl md:text-2xl mb-5 text-dark-grey">
            A place to hold all your project management resources and data.
          </p>
          <button className="full-button-large text-dark-grey bg-accent-yellow hover:bg-amber-500 md:text-xl">
            <Link to="/signup">Get started</Link>
          </button>
        </div>
      </main>
    </div>
  )
}
export default LandingPage
