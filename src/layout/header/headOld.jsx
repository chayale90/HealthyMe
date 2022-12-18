import React from 'react'
import { Outlet, Link } from 'react-router-dom'

export default function HeaderOld() {
  return (



    <header className='container-fluid admin-header bg-info'>
    <div className="container ">
      <div className="row align-items-center">
        <div className="logo col-auto">
          <Link to="/foods"><h2>Client panel</h2></Link>
        </div>
        <nav className='d-flex col justify-content-between align-items-center'>
          <ul className='nav'>
            <li>
              <Link to="/foods">foods</Link>
            </li>
          </ul>
          <div>
            <button>Log out</button>
          </div>
        </nav>
      </div>
    </div>
  </header>









  )
}
