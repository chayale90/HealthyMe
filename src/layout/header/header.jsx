import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
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
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "../../services/theme"
import Logo from '../../components/general_comps/logo'
import MyInfo from '../../services/myInfo';
import { TOKEN_NAME } from '../../services/apiService';
import { resetUser, changeFavorite, changeHome } from "../../features/userSlice"
import FollowersList from '../../components/client/followers/followersList';


export default function Header() {
  const { user, home, favorite } = useSelector(myStore => myStore.userSlice);
  console.log(user);

  const nav = useNavigate();
  const dispatch = useDispatch();

  //navbar states
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  // const [values, setValues] = useState({ home: 'block', favorite: 'none' });
  const [displayBurger, setDisplayBurger] = useState("block");
  const [displayButtonX, setDisplayButtonX] = useState("none");

  //dialog open-close
  const [open, setOpen] = useState(false);
  const [openFollowers, setOpenFollowers] = useState(false);

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
  const ClickLogout = () => {
    setOpen(true);
    handleCloseUserMenu()

  };


  // dialog followers functions
  const handleCloseFollowers = () => {
    setOpenFollowers(false);
  };
  const ClickFollowers = () => {
    setOpenFollowers(true);
    handleCloseUserMenu()
  };



  const goToMyProfile = () => {
    nav("/myProfile")
    handleCloseUserMenu()
  }

  const onLogOut = () => {
    //delete token
    localStorage.removeItem(TOKEN_NAME);
    //delete user from redux
    dispatch(resetUser())
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

      {/* provide details of user (that login) to all comps with redux */}
      <MyInfo />

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
                <MenuItem onClick={() => {
                  nav("/foods")
                  handleCloseNavMenu()
                }}>
                  Home</MenuItem>
                <MenuItem onClick={() => {
                  handleCloseNavMenu()
                }}>Favorite</MenuItem>
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
                    // setValues({
                    //   home: "block",
                    //   favorite: "none",
                    // });

                    nav("/foods")
                    // dispatch(changeHome({ val: "block" }))
                    // dispatch(changeFavorite({ val: "none" }))
                  }}
                  sx={{
                    px: 3, paddingTop: "24px", paddingBottom: "21px"
                  }}>
                  Home
                </Button>
                <div className="mx-auto" style={{ display: home, minHeight: '2px', background: "#A435F0", width: "70%" }} ></div>
              </div>

              <div >
                <Button
                  // onClick={handleCloseNavMenu}
                  onClick={() => {
                    // setValues({
                    // dispatch()  favorite: "block",
                    //   home: "none",
                    // });
                    dispatch(changeHome({ val: "none" }))
                    dispatch(changeFavorite({ val: "block" }))
                    // nav("/myFavoriteFoods")
                  }}
                  sx={{
                    px: 3, paddingTop: "24px", paddingBottom: "21px"
                  }}
                >
                  Favorites
                </Button>
                <div className="mx-auto" style={{ display: favorite, minHeight: '2px', background: "#A435F0", width: "70%" }} ></div>
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

                <MenuItem onClick={goToMyProfile}>Profile</MenuItem>
                <MenuItem onClick={ClickFollowers}>Followers</MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>Followings</MenuItem>
                <MenuItem onClick={ClickLogout}>Logout</MenuItem>


                <Dialog
                  open={openFollowers}
                  onClose={handleCloseFollowers}
                  aria-labelledby="followers-dialog"
                  aria-describedby="followers-dialog-description"
                >

                  <div className='container p-5'>

                    <h2 className='s24 weight500 mb-4'>Followers</h2>
                    <IconButton
                      style={{ position: 'absolute', right: 2, top: 2 }}
                      onClick={handleCloseFollowers}
                    >
                      <CloseIcon />
                    </IconButton>
                    <FollowersList />

                  </div>
                </Dialog>







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
