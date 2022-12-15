import React, { useState } from 'react'
import Logo from '../../general_comps/logo'
import SignUpComp1 from './comp1/signUpComp1'
import SignUpComp2 from './comp2/signUpComp2'
import ImagesPosts from './imagesPosts'
import { useSelector } from "react-redux";



export default function SignUpPage() {
  const { showHideComp1,showHideComp2,form } = useSelector(myStore => myStore.signUpSlice)
  
  console.log(form)

  return (
    <div>
      <div className='d-flex justify-content-between '>
        <div className='col-lg-5 col-xl-4 col-md-6 ms-3 mt-1'>
          <Logo />

          <div className=' me-xl-3 ps-5 ms-5 align-items-center' >
            {showHideComp1 &&
              <SignUpComp1/>
            }

            {showHideComp2 &&
              <SignUpComp2/>
            }
          </div>

        </div>

        <div className='col-6 text-end d-lg-block d-none'>
          <ImagesPosts />
        </div>

      </div>
    </ div >

  )
}
