import React from 'react'
import Logo from '../../general_comps/logo'
import SignUpComp1 from './comp1/signUpComp1'
import SignUpGeneral from './signUpGeneral'


export default function SignUpPage() {
  return (
    <div >
      <div className='container'>
          <Logo />
        {/* <SignUpGeneral/> */}
        <SignUpComp1/>
      </div>
    </div>
  )
}
