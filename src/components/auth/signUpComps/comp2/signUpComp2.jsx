import React from 'react'
import Logo from '../../../general_comps/logo'
import ImagesPosts from '../imagesPosts'
import SignUpTitle from '../signUpTitle'
import InputComp2 from './inputComp2'
import Progress2 from './progress2'

export default function SignUpComp2() {
    return (
        <React.Fragment>
            
                <div style={{ width: "310px" }}>
                    <Progress2 />
                    <SignUpTitle />
                    <InputComp2 />
                </div>

        </React.Fragment>
    )
}
