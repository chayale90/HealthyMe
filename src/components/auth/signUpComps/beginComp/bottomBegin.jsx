import React from 'react'
import { Link } from 'react-router-dom'

export default function BottomBegin() {

  return (
      <div style={{ marginTop: "12px" }} className='d-flex justify-content-center s14'>
        <p className='gray ' style={{ marginBottom: 0 }}>Already have an account?</p>
        <Link to="/" style={{ textDecoration: "none" }}><p style={{ marginLeft: "6px", marginBottom: 0 }} className='purple'>Log In</p></Link>
      </div>
  )
}
