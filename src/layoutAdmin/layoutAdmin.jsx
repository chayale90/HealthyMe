import React from 'react'
import { Outlet } from "react-router-dom"
import HeaderAdmin from './header/headerAdmin'


const LayoutAdmin = () => {
  return (
    <div>
       <HeaderAdmin/>
       <Outlet/>
       {/* <FooterAdmin/> */}
    </div>
  )
}

export default LayoutAdmin