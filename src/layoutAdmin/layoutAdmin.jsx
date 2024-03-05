import React from 'react'
import { Outlet } from "react-router-dom"
import FooterAdmin from './footer/footerAdmin'
import HeaderAdmin from './header/headerAdmin'


const LayoutAdmin = () => {
  return (
    <>
       <HeaderAdmin/>
       <Outlet/>
       {/* <FooterAdmin/> */}
    </>
  )
}

export default LayoutAdmin