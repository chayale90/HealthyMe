import React from 'react'
import { Link } from 'react-router-dom'
import "./headerAdmin.css";

export default function HeaderAdmin() {
  return (
    <header className='container-fluid admin-header bg-info'>
      <div className="container ">
        <div className="row align-items-center">
          <div className="logo col-auto">
            <Link to="/admin"><h2>Admin panel</h2></Link>
          </div>
          <nav className='d-flex col justify-content-between align-items-center'>
            <ul className='nav'>
              <li>
                <Link to="/admin/users">Users</Link>
              </li>
              <li>
                <Link to="/admin/categories">Categories</Link>
              </li>
              <li>
                <Link to="/admin/foods">Foods</Link>
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
