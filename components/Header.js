import { LOGO_URL } from "../utils/constant"

import { use, useState } from "react"
import { Link } from "react-router-dom"

const Header = () => {
  const [btnNameReact, setbtnName] = useState("Login")
  return (
    <div className="header">
      <div className="logo">
        <img src={LOGO_URL} className="logo-item"></img>
      </div>

      <div className="heading">
        <h1>FOODIEEE</h1>
      </div>
      <div className="nav-items">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>Cart</li>
          <button
            className="login-btn"
            onClick={() => {
              btnNameReact === "Login"
                ? setbtnName("Logout")
                : setbtnName("Login")
            }}
          >
            {btnNameReact}
          </button>
        </ul>
      </div>
    </div>
  )
}
export default Header
