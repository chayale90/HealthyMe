import React from 'react'
import InputsSignUp from './inputsComp1'
import Progress1 from './progress1'
import SignUpTitle from '../signUpTitle'
import ButtomComp1 from './buttomComp1'

export default function SignUpComp1() {
    return (

        <div style={{ width: "380px" }} >
            <Progress1 />
            <SignUpTitle />
            <InputsSignUp />
            <ButtomComp1 />
        </div>



    )
}
