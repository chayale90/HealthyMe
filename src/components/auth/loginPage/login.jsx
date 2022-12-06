import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IconButton, OutlinedInput, InputLabel, InputAdornment, Button, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "../../../services/theme"
// import style from './logintest.module.css'
import { API_URL, doApiMethod, TOKEN_NAME } from '../../../services/apiService';
import "./login.css"
import { btnStyle } from '../../../services/btnStyle';


export default function Login() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const nav = useNavigate();

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
    // data -> מכיל את כל המאפיינים שלה השמות של האינפוטים עם הערך שלהם
    doApiForm(bodyData);
  }

  const doApiForm = async (bodyData) => {
    let url = API_URL + "/users/login"
    try {
      let resp = await doApiMethod(url, "POST", bodyData);
      // Save the token
      localStorage.setItem(TOKEN_NAME, resp.data.token);
      if (resp.data.role == "admin") {
        toast.info("Welcome admin!");
        //go to userList
        nav("/admin/users")
      }
      else if (resp.data.role == "user")
        nav("/foods")
      console.log(resp.data);
    }
    catch (err) {
      console.log(err.response);
      toast.error("User or password worng, or service down");
    }
  }

  let emailRef = register("email", {
    required: true,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  })

  let passwordRef = register("password", { required: true, minLength: 3 });

  return (
    <div className='container'>
      <div style={{ width: "380px" }}  >
        <h2>Log In</h2>
        <h6 className='welcomeText s18'>Welcome back! Please enter your details.</h6>

        <form>
          <div className='inputEmail'>
            <ThemeProvider theme={theme}>
              {/* <InputLabel >Email</InputLabel> */}
              <TextField fullWidth {...emailRef} label="Email" id="outlined-basic" variant="outlined" type={"text"} />
            </ThemeProvider>
            {errors.email && <div className="text-danger ">Enter valid email</div>}

          </div>

          <div className="inputPass">
            <FormControl sx={{ width: '100%' }} variant="outlined">
              <ThemeProvider theme={theme}>
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput  {...passwordRef}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      console.log('Enter key pressed');
                      handleSubmit(onSubForm)
                    }
                  }}
                  id="outlined-adornment-password"
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
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
                {errors.password && <div className="text-danger">Enter min 3 charts password</div>}
              </ThemeProvider>
            </FormControl>
          </div>

          <Link to="" style={{ textDecoration: "none" }}><p className='forgot1 purple'>Forgot password?</p></Link>

          <Button onClick={handleSubmit(onSubForm)} sx={btnStyle} className='loginBtn'>Log In</Button>

          <div style={{ marginTop: "17px", marginBottom: "9px" }} className='d-flex justify-content-center'>
            <p style={{ marginBottom: 0 }}>Don’t have an account?</p>
            <Link to="/signUp" style={{ textDecoration: "none" }}><p style={{ marginLeft: "6px", marginBottom: 0 }} className='purple'>sign up now!</p></Link>
          </div>

          <Link to="" style={{ textDecoration: "none" }}><p className='purple text-center m-0'>Forgot password?</p></Link>

        </form >
      </div>
    </div >
  )
}
