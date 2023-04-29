import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IconButton, OutlinedInput, InputLabel, InputAdornment, Button, TextField } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { CircularProgress } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "../../../services/theme"
// import style from './logintest.module.css'
import { API_URL, doApiMethod, TOKEN_NAME } from '../../../services/apiService';
import { btnStyle } from '../../../services/btnStyle';
import "./login.css"


export default function Login() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const nav = useNavigate();
  const [displayProgress, setDisplayProgress] = useState("none");

  const [values, setValues] = useState({ password: '', showPassword: false });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubForm = (bodyData) => {
   let email = bodyData.email.toLowerCase(); //To convert Lower Case
   let password= bodyData.password
    // bodyData -> contain all values of inputs 
    doApiForm({email,password});
  }

  const doApiForm = async (bodyData) => {
    setDisplayProgress("flex")
    let url = API_URL + "/users/login"
    try {
      let resp = await doApiMethod(url, "POST", bodyData);
      // console.log(resp.data);
      // Save the token
      localStorage.setItem(TOKEN_NAME, resp.data.token);
      if (resp.data.role == "admin") {
        toast.info("Welcome admin!");
        //go to userList
        nav("/admin/users")
      }
      else if (resp.data.role == "user")
        nav("/foods")
    }
    catch (err) {
      console.log(err);
      toast.error("User or password wrong, or service down");
      setDisplayProgress("none")
    }
  }

  let emailRef = register("email", {
    required: true,
    pattern:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i
  })

  let passwordRef = register("password", { required: true, minLength: 3 });


  const loginGuest = () => {
    doApiForm({
      email: "guest@walla.com",
      password: "1234"
    });
  }

  return (

    <div>
      <ThemeProvider theme={theme}>
        <h2 className='s22'>Log In</h2>
        <h6 className='welcomeText'>Welcome back! Please enter your details.</h6>

        <form>
          <div className='inputEmail'>
            <InputLabel style={{ fontSize: "14px" }} >Email</InputLabel>
            <OutlinedInput size="small"
              autoComplete="userName"
              fullWidth {...emailRef}
              label="Email"
              id="outlined-basic"
              variant="outlined"
              type={"text"}
            />
            {errors.email && <div className="text-danger s12">Enter valid email</div>}

          </div>

          <div className='inputPass'>
            <InputLabel style={{ fontSize: "14px" }} htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput size="small" fullWidth {...passwordRef}
              id="outlined-adornment-password"
              autoComplete="password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
            {errors.password && <div className="text-danger s12">Enter min 3 charts password</div>}
          </div>

          {/* <Link to=""
            style={{ textDecoration: "none" }}>
            <p className='purple m-0 s14'>
              Forgot password?
            </p>
          </Link> */}

          <div className='d-flex justify-content-center mt-3'>
            <div className='w-25' >
              <hr />
            </div>
            <Button
              className='mx-2'
              onClick={loginGuest}
              style={{ textDecoration: "none", marginBottom: "10px" }}
              variant={"text"}
            >
              <p className='p-0 m-0'>
                Login-Guest
              </p>
            </Button>
            <div className='w-25'>
              <hr />
            </div>
          </div>

          <Button
            onClick={handleSubmit(onSubForm)}
            sx={btnStyle}
            className='loginBtn'
            endIcon={<CircularProgress sx={{ display: displayProgress }} size={"20px"} color="success" />}
          >
            Log In
          </Button>

          <div style={{ marginTop: "14px", marginBottom: "6px" }} className='d-flex justify-content-center'>
            <p className='s14 ' style={{ marginBottom: 0 }}>Don’t have an account?</p>
            <Link to="/signUp" style={{ textDecoration: "none" }}><p style={{ marginLeft: "6px", marginBottom: 0 }} className='purple s14'>sign up now!</p></Link>
          </div>

        </form >
      </ThemeProvider>
    </div>

  )
}
