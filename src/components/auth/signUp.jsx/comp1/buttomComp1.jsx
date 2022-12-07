import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function ButtomComp1() {
  const nav = useNavigate()

  return (
    <div>
      <div style={{ marginTop: "12px" }} className='d-flex justify-content-center'>
        <p style={{ marginBottom: 0 }}>Already have an account?</p>
        <Link to="/" style={{ textDecoration: "none" }}><p style={{ marginLeft: "6px", marginBottom: 0 }} className='purple'>Log In</p></Link>
      </div>
    </div>
  )
}
