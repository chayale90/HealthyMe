import React from 'react'
import Logo from '../../general_comps/logo'
import SignUpComp1 from './comp1/signUpComp1'
import ImagesPosts from './imagesPosts'
// import SignUpGeneral from './signUpGeneral'


export default function SignUpPage() {


  return (
    <div >
      <div className='d-flex justify-content-between '>
        <div className='col-lg-5 col-xl-4 col-md-6'>
          <Logo />

          <div className='ms-5 pe-xl-3 mt-4 ps-5 align-items-center' >
            <SignUpComp1 />
          </div>

        </div>

        <div className='col-6 text-end d-lg-block d-none'>
          <ImagesPosts />
        </div>

      </div>
    </ div >

  )
}
