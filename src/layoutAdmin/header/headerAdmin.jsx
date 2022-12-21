import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { TOKEN_NAME } from '../../services/apiService';
import "./headerAdmin.css";
import CheckAdminComp from "../../components/auth/checkComps/checkAdminComp"
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

  return (<div>
    <CheckAdminComp />
    <header className='container-fluid admin-header bg-info py-2'>
      <div className="container ">
        <div className="row align-items-center">
          <div className="logo col-auto">
            <h2 className='mb-0'>Admin panel</h2>
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
              <li>
                <Link to="/admin/upload">upload</Link>
              </li>
            </ul>
            <div>
              <Button variant='contained' color='inherit' onClick={handleClickOpen}>Log out</Button>
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
  </div>
  )
}
