// import { Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {IconButton,OutlinedInput,InputLabel,InputAdornment} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { API_URL, doApiMethod, TOKEN_NAME } from '../../../services/apiService';
import "./login.css"

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
    <div className='container col-md-7'>

      <div style={{ minHeight: "500px" }} className='align-items-center justify-content-center'>
        <h2 style={{ marginBottom: "8px" }} className='m-0'>Log In</h2>
        <p className='welcomeText'>Welcome back! Please enter your details.</p>

        <form onSubmit={handleSubmit(onSubForm)}>

          <div className='inputEmail '>
            <InputLabel >Email</InputLabel>
            <OutlinedInput sx={{ width: '380px' }} {...emailRef} label="Email" id="outlined-basic" variant="outlined" />
            {errors.email && <div className="text-danger ">Enter valid email</div>}
          </div>

          <div className='inputPass'>
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput sx={{ width: '380px' }} {...passwordRef}
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
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
            {errors.password && <div className="text-danger">Enter min 3 charts password</div>}

          </div>

          <Link to="" style={{ textDecoration: "none" }}><p className='forgot1 purple'>Forgot password?</p></Link>

          <button className='loginBtn'>Log In</button>

          <div style={{ width: "379px", marginBottom: "6px" }} className='d-flex justify-content-center'>
            <p style={{ fontSize: "18px", marginBottom: 0 }}>Don’t have an account?</p>
            <Link to="" style={{ textDecoration: "none" }}><p style={{ fontSize: "18px", marginLeft: "6px", marginBottom: 0 }} className='purple'>sign up now!</p></Link>
          </div>

          <Link to="" style={{ textDecoration: "none" }}><p style={{ fontSize: "18px", width: "379px" }} className='purple text-center'>Forgot password?</p></Link>

        </form >
      </div>
    </div >
  )
}
