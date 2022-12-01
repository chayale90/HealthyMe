import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { TOKEN_NAME } from '../../services/apiService';
import "./headerAdmin.css";

export default function HeaderAdmin() {
  const nav = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onLogOut = () => {
    //delete token
    localStorage.removeItem(TOKEN_NAME);
    toast.success("You logOut")
    nav("/")
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
              {localStorage[TOKEN_NAME] ? <Button variant='contained' color='inherit' onClick={handleClickOpen}>Log out</Button> : <span></span>}
            </div>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Are you sure you want to logout?"}
              </DialogTitle>
              <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={onLogOut} autoFocus>Agree</Button>
              </DialogActions>
            </Dialog>
          </nav>
        </div>
      </div>
    </header>
  )
}
