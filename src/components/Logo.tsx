import logo from "../assets/logo.png"

const Logo = () => {
  return (
    <a className="navbar-brand">
        <img
         src={logo}
         alt="logo"
         width={48}
        height={48}
        className="rounded-circle"
        >
        </img>
      
    </a>
  )
}

export default Logo
