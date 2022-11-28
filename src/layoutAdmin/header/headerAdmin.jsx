import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TOKEN_NAME } from '../../services/apiService';
import "./headerAdmin.css";


export default function HeaderAdmin() {
  const nav = useNavigate();


  const onLogOut = () => {
    //delet token
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem(TOKEN_NAME)
      nav("/")
    }

  }



  return (
    <header className='container-fluid admin-header bg-info'>
      <div className="container ">
        <div className="row align-items-center">
          <div className="logo col-auto">
            <h2>Admin panel</h2>
          </div>
          <nav className='d-flex col justify-content-between align-items-center'>

            {localStorage[TOKEN_NAME] ?
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
              </ul> : <ul></ul>}
            <div>
              {localStorage[TOKEN_NAME] ? <button onClick={onLogOut}>Log out</button> : <span></span>}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
