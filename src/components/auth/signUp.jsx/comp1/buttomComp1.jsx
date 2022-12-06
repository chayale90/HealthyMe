import { Button } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { btnStyle } from '../../../../services/btnStyle'

export default function ButtomComp1() {
  const nav = useNavigate()

  return (
    <div>
      <Button onClick={()=>nav('/signUp/comp2')} sx={btnStyle} className='loginBtn'>Next</Button>
      <div style={{ marginTop: "17px", marginBottom: "9px" }} className='d-flex justify-content-center'>
        <p style={{ marginBottom: 0 }}>Already have an account?</p>
        <Link to="/" style={{ textDecoration: "none" }}><p style={{ marginLeft: "6px", marginBottom: 0 }} className='purple'>Log In</p></Link>
      </div>
    </div>
  )
}
