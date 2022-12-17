import React, { useState } from 'react'
import Logo from '../../general_comps/logo'
import SignUpComp1 from './comp1/signUpComp1'
import SignUpComp2 from './comp2/signUpComp2'
import ImagesPosts from './imagesPosts'
import { useSelector } from "react-redux";



export default function SignUpPage() {
  const { showHideComp1, showHideComp2, form } = useSelector(myStore => myStore.signUpSlice)

  console.log(form)

  return (
    <div>
      <div className='d-flex justify-content-lg-between justify-content-center'>
        <div className='col-9 col-sm-8 col-md-6 col-lg-5 col-xl-4'>
          <div className='ps-lg-5 ms-lg-5 me-lg-1'>

            <div className='d-flex justify-content-between'>
              <Logo />
              <div className='d-lg-none d-block col-5 mt-5 mb-3 '>
                <ImagesPosts width={"100%"} />
              </div>
            </div>

            {showHideComp1 &&
              <SignUpComp1 />
            }

            {showHideComp2 &&
              <SignUpComp2 />
            }
            
          </div>
        </div>

        <div className='col-6 text-end d-lg-block d-none'>
          <ImagesPosts width={"97%"} />
        </div>

      </div>
    </ div >

  )
}
