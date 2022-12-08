import React from 'react'
import InputsSignUp from './inputsComp1'
import Progress1 from './progress1'
import SignUpTitle from '../signUpTitle'

export default function SignUpComp1() {
    return (

        <div 
        // className='mt-4 col-md-6 col-sm-8 col-lg-4 col-xl-3' 
        style={{width:"310px"}}>
            <Progress1 />
            <SignUpTitle />
            <InputsSignUp />
        </div>



    )
}
