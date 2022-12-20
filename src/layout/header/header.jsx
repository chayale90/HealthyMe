import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

import Logo from '../../components/general_comps/logo'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "../../services/theme"
// import "./header.css"
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const pages = ['Home', 'Favorites'];

export default function Header() {
  const { user } = useSelector(myStore => myStore.userSlice);
  console.log(user);
  const nav = useNavigate();

  //navbar states
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [values, setValues] = useState({ button1: 'block', button2: 'none', button3: 'none' });
  const [displayBurger, setDisplayBurger] = useState("block");
  const [displayButtonX, setDisplayButtonX] = useState("none");

  //dialog states
  const [open, setOpen] = useState(false);

  //nanbar functions
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
    setDisplayBurger("none")
    setDisplayButtonX("block")
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    setDisplayBurger("block")
    setDisplayButtonX("none")
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  // dialog functions
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const onLogOut = () => {
    //delete token
    // localStorage.removeItem(TOKEN_NAME);
    toast.success("You log Out")
    nav("/")
  }


  //if for the avatar image
  let srcImg;
  if (user.img_url == "" && user.sex == "male") {
    srcImg = "public/images/man.png"
  } else if (user.img_url == "" && user.sex == "female") {
    srcImg = "public/images/woman.png"
  } else {
    srcImg = user.img_url
  }

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" sx={{ background: "rgba(255, 255, 255, 1)" }}>
        <Container maxWidth="lg">
          <div className='d-flex justify-content-between align-items-center' >
            <div className='d-none d-md-flex'>
              <Link to="/foods">
                <Logo margin={"mb-1"} />
              </Link>
            </div>

            <div className='d-flex d-md-none '>
              <IconButton
                size="small"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="primary"
              >
                <MenuIcon sx={{ display: displayBurger }} />
                <CloseIcon sx={{ display: displayButtonX }} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },

                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </div>

            <div className='d-flex d-md-none mx-auto'>
              <Link to="/foods">
                <Logo margin={"mb-1"} />
              </Link>
            </div>

            <div className='d-none d-md-flex' >
              <div>
                <Button
                  // onClick={handleCloseNavMenu}
                  onClick={() => {
                    setValues({
                      button1: "block",
                      button2: "none",
                    });
                  }}
                  sx={{
                    px: 3, paddingTop: "24px", paddingBottom: "21px"
                  }}>
                  Home
                </Button>
                <div className="mx-auto" style={{ display: values.button1, minHeight: '2px', background: "#A435F0", width: "70%" }} ></div>
              </div>

              <div >
                <Button
                  // onClick={handleCloseNavMenu}
                  onClick={() => {
                    setValues({
                      button2: "block",
                      button1: "none",
                    });
                  }}
                  sx={{
                    px: 3, paddingTop: "24px", paddingBottom: "21px"
                  }}
                >
                  Favorites
                </Button>
                <div className="mx-auto" style={{ display: values.button2, minHeight: '2px', background: "#A435F0", width: "70%" }} ></div>
              </div>
            </div>


            <div className='d-flex align-items-center justify-content-md-end'>
              <Tooltip title={user.name} >
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Avatar" src={srcImg} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >

                <MenuItem onClick={handleCloseUserMenu}>Profile</MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>followers</MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>followings</MenuItem>
                <MenuItem onClick={handleClickOpen}>Logout</MenuItem>


                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <div className='p-3'>
                    <DialogTitle
                     sx={{ mb: 2 }}
                      id="alert-dialog-title">
                      {"Are you sure you want to logout?"}
                    </DialogTitle>
                    <DialogActions>
                      <Button onClick={handleClose}>Disagree</Button>
                      <Button onClick={onLogOut} autoFocus>Agree</Button>
                    </DialogActions>
                  </div>
                </Dialog>

              </Menu>
            </div>
          </div>
        </Container>
      </AppBar>
    </ThemeProvider >
  );
}
