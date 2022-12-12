import React, { useState } from 'react'
import Logo from '../../general_comps/logo'
import SignUpComp1 from './comp1/signUpComp1'
import SignUpComp2 from './comp2/signUpComp2'
import ImagesPosts from './imagesPosts'
// import SignUpGeneral from './signUpGeneral'


export default function SignUpPage() {
  const [showHideComp1, setshowHideComp1] = useState(true);
  const [showHideComp2, setshowHideComp2] = useState(false);
  const [form,setForm] = useState({})



  console.log(form)

  return (
    <div >
      <div className='d-flex justify-content-between '>
        <div className='col-lg-5 col-xl-4 col-md-6'>
          <Logo />

          <div className='ms-5 pe-xl-3 mt-4 ps-5 align-items-center' >
            {showHideComp1 &&
              <SignUpComp1
                showHideComp1={showHideComp1}
                setshowHideComp1={setshowHideComp1}
                showHideComp2={showHideComp2}
                setshowHideComp2={setshowHideComp2}
                form={form}
                setForm={setForm}
              />
            }

            {showHideComp2 &&
              <SignUpComp2
                showHideComp1={showHideComp1}
                setshowHideComp1={setshowHideComp1}
                showHideComp2={showHideComp2}
                setshowHideComp2={setshowHideComp2}
                form={form}
                setForm={setForm}
              />
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
