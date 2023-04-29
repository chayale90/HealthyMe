import React, { useState } from 'react'
import Logo from '../../general_comps/logo'
import SignUpBeginComp from './beginComp/signUpBeginComp'
import SignUpEndComp from './endComp/signUpEndComp'
import ImagesPosts from './imagesPosts'
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'


export default function SignUpPage() {
  const { isShowBeginComp, isShowEndComp, form } = useSelector(myStore => myStore.signUpSlice)

  return (
      <div className='d-flex justify-content-lg-between justify-content-center'>
        <div className='col-11 col-sm-8 col-md-6 col-lg-5 col-xl-4'>
          <div className='ps-lg-5 ms-lg-5 me-lg-1'>

            <div className='d-flex justify-content-between mb-3 mb-lg-0'>
              <Link to="/"> <Logo margin="mb-5" /></Link>
            </div>

            {isShowBeginComp &&
              <SignUpBeginComp />
            }

            {isShowEndComp &&
              <SignUpEndComp />
            }

          </div>
        </div>

        <div className='col-6 text-end d-lg-block d-none'>
          <ImagesPosts width={"97%"} />
        </div>

      </div>
  )
}
