import { Link } from "react-router-dom"
import logo from "../assets/logo.png"

const Logo = () => {
  return (
    <Link className="navbar-brand"   to ="/">
        <img
         src={logo}
         alt="logo"
         width={48}
        height={48}
        className="rounded-circle"
        >
        </img>
      
    </Link>
  )
}

export default Logo
