import { Link } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Logo({ margin, width }) {
  const nav = useNavigate()
  return (
    <div className={margin} >
      {/* <img src="/images/logo3.png" alt="Logo" width={"150"} />
      <img src="/images/logo2.png" alt="Logo" width={"150"} />
      <img src="/images/logo4.png" alt="Logo" width={"150"} /> */}


   
        <img style={{ cursor: "pointer" }}
          onClick={() => {
            nav("/")
          }}
          src="/images/logo5.png" alt="Logo" width={"100"} />
   

    </div>
  )
}
