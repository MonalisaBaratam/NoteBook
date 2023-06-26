import React from 'react'
import { Link, useLocation } from 'react-router-dom'
const Navbar = () => {
  const handleClick = ()=>{
    localStorage.setItem('token','')
  }
  let location = useLocation();
  return (
    <nav className="navbar bg-dark navbar-expand-lg navbar-dark ">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">MYNOTES</Link>
        {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button> */}
        {/* <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/home" ? "active" : ""}`} aria-current="page" to="/home">Home</Link>
            </li> */}
            {/* <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
            </li> */}
            {/* <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </Link>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" href="#">Action</Link></li>
            <li><Link className="dropdown-item" href="#">Another action</Link></li>
            <li><hr className="dropdown-divider"/></li>
            <li><Link className="dropdown-item" href="#">Something else here</Link></li>
          </ul>
        </li>
        <li className="nav-item">
          <Link className="nav-link disabled">Disabled</Link>
        </li> */}
          {/* </ul>
        </div> */}
        {!localStorage.getItem('token')?
          <form className="d-flex" role="search">
            <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
            <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
          </form>:
          <Link className="btn btn-primary mx-1" to="/login" onClick={handleClick} role="button">Logout</Link>}
      </div>
    </nav>
  )
}

export default Navbar
