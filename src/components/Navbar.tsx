import React from "react";
import { FaBars } from "react-icons/fa";
import Logo from "./Logo";
import { NavLink } from "react-router-dom";

// Define a type for the user object
interface User {
  email: string;
  name: string;
}

interface NavbarProps {
  currentUser: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <Logo />
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav">
            <NavLink className="nav-link" to="/">
              Dashboard
            </NavLink>

            {currentUser && (
              <>
                <NavLink className="nav-link" to="/new">
                  New Expense
                </NavLink>
                <NavLink className="nav-link" to="/reports">
                  Reports
                </NavLink>
              </>
            )}
          </div>
        </div>
        <div className="d-flex align-items-center" role="search">
          {currentUser ? (
            <>
              <span className="navbar-text me-2">
                Welcome, {currentUser.name}!
              </span>
              <NavLink className="btn btn-sm btn-outline-light" to="/logout">Logout</NavLink>
            </>
          ) : (
            <>
              <NavLink className="btn btn-sm btn-outline-light" to="/login">Login</NavLink>
              <NavLink className="btn btn-sm btn-outline-light mx-1" to="/register">Register</NavLink>
            </>
          )}
          <button
            className="navbar-toggler ms-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <FaBars color="white" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
