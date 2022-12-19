import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
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
import Logo from '../../components/general_comps/logo'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "../../services/theme"

// import "./header.css"

import { Link } from 'react-router-dom';

const pages = ['Home', 'Favorites'];
const settings = ['Profile', 'followers', 'followings', 'Logout'];

export default function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const [values, setValues] = useState({ button1: 'block', button2: 'none', button3: 'none' });
  const [displayBurger, setDisplayBurger] = useState("block");
  const [displayButtonX, setDisplayButtonX] = useState("none");


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
              <Tooltip title="Open settings" >
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="personal profile" src="/images/avatar/2.jpg" />
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
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </div>
          </div>
        </Container>
      </AppBar>
    </ThemeProvider >
  );
}
