import { minHeight } from '@mui/system'
import React from 'react'
import Logo from '../../general_comps/logo'
import SignUpComp1 from './comp1/signUpComp1'
// import SignUpGeneral from './signUpGeneral'


  const backgroundLogin =  {
    backgroundImage: " url(/images/loginPic.png)",
    backgroundPosition: "right top",
    // backgroundPosition: "top",
    backgroundSize:"inherit",
    backgroundRepeat: "no-repeat",
    minHeight:"1000px"
  }



export default function SignUpPage() {


  return (
    <div  style={backgroundLogin} >
      <div  className='container '>
        <div className='row ms-5'>
          <div className='col-6'>
            <Logo />
            {/* <SignUpGeneral/> */}
            <SignUpComp1 />
          </div>

      

        </div>
      </div>
          <div className='col-6 text-end p-0 m-0 '>
            {/* <img src="/images/loginPic.png" alt="imagesPosts" width={"90%"} /> */}
          </div>
    </div>
  )
}
