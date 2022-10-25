import React from 'react'

const Navbar = () => {
  return (
    <>
    <nav className="navbar navbar-expand-lg" style={{backgroundColor: '#f1ebeb',fontSize: '1.2rem'}}>
  <div className="container-fluid">
    <a className="navbar-brand" href="/" style={{fontSize:"1.4rem",fontWeight:"bold"}}>Eventrra</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav head-link">
      <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/createEvents">Create Events</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/invitation">Invited</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/about">About</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </>
  )
}

export default Navbar;