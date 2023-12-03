import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IconButton, OutlinedInput, InputLabel, InputAdornment, Button, FormHelperText, Box } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { CircularProgress } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "@/services/theme"
import { API_URL, doApiMethod, TOKEN_NAME } from '@/services/apiService';
import { btnStyle } from '@/services/btnStyle';
import "./login.css"


export default function Login() {

  const { register, handleSubmit, formState: { errors }, getValues } = useForm({
    defaultValues: {
      email: "",
      password: "",
    }
  });
  const nav = useNavigate();
  const [displayProgress, setDisplayProgress] = useState("none");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(prev => !prev)
  };

  const onSubForm = (bodyData) => {
    let email = bodyData.email.toLowerCase(); // Convert to lowercase
    let password = bodyData.password
    // bodyData -> contain all values of inputs 
    doApiLogin({ email, password });
  }

  const doApiLogin = async (bodyData) => {
    setDisplayProgress("flex")
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
    }
    catch (err) {
      console.log(err);
      toast.error("User or password wrong, or service down");
      setDisplayProgress("none")
    }
  }

  let emailRef = register("email", {
    required: true,
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i
  })

  let passwordRef = register("password", {
    required: { value: true, message: 'חובה למלא סיסמא' },
    minLength: { value: 3, message: 'הסיסמה חייבת להכיל לפחות 3 תווים' },
    maxLength: { value: 99, message: 'הסיסמה יכולה להכיל עד 99 תווים' }
  });


  const loginGuest = () => {
    doApiForm({
      email: "guest@walla.com",
      password: "1234"
    });
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <h2 className='s22'>Log In</h2>
        <h6 className='welcomeText'>Welcome back! Please enter your details.</h6>

        <form onSubmit={handleSubmit(onSubForm)}>
          <Box className='inputEmail'>
            <InputLabel style={{ fontSize: "14px" }} >Email</InputLabel>
            <OutlinedInput
              {...emailRef}
              size="small"
              autoComplete="userName"
              fullWidth
              label="Email"
              variant="outlined"
              type="text"
            />
            <FormHelperText error={!!errors.email}>
              {errors.email && errors?.email?.message}
            </FormHelperText>
          </Box>

          <Box className='inputPass'>
            <InputLabel style={{ fontSize: "14px" }} htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              {...passwordRef}
              size="small"
              fullWidth
              id="outlined-adornment-password"
              autoComplete="password"
              type={showPassword ? 'text' : 'password'}
              value={getValues.password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> :<VisibilityOff /> }
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
            <FormHelperText error={!!errors.password}>
              {errors.password && errors?.password?.message}
            </FormHelperText>
          </Box>


          <Box className='d-flex justify-content-center mt-3'>
            <Box className='w-25' >
              <hr />
            </Box>
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
            <Box className='w-25'>
              <hr />
            </Box>
          </Box>

          <Button
            type="submit"
            sx={btnStyle}
            className='loginBtn'
            endIcon={<CircularProgress sx={{ display: displayProgress }} size={"20px"} color="success" />}
          >
            Log In
          </Button>

          <Box style={{ marginTop: "14px", marginBottom: "6px" }} className='d-flex justify-content-center'>
            <p className='s14 ' style={{ marginBottom: 0 }}>Don’t have an account?</p>
            <Link to="/signUp" style={{ textDecoration: "none" }}><p style={{ marginLeft: "6px", marginBottom: 0 }} className='purple s14'>sign up now!</p></Link>
          </Box>

        </form >
      </ThemeProvider>
    </>
  )
}
