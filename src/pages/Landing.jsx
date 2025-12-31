import { Link } from "react-router-dom"

const Landing = () => {
  return (
    <div>Landing <Link to="/signin" className="btn btn-primary">Go to signin</Link> </div>
  )
}

export default Landing