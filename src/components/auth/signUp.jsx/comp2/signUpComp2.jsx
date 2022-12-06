import React from 'react'
import Logo from '../../../general_comps/logo'
import SignUpTitle from '../signUpTitle'
import InputComp2 from './inputComp2'
import Progress2 from './progress2'

export default function SignUpComp2() {
    return (
        <React.Fragment>
            <Logo />
            <div className='container'>
                <div 
                style={{width:"300px"}}>
                    <Progress2 />
                    <SignUpTitle />
                    <InputComp2 />
                </div>
            </div>
        </React.Fragment>
    )
}
