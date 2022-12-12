import React from 'react'
import SignUpTitle from '../signUpTitle'
import InputComp2 from './inputComp2'
import Progress2 from './progress2'

export default function SignUpComp2({   showHideComp1,
    setshowHideComp1,
    showHideComp2,
    setshowHideComp2,
    form,
    setForm}) {
    return (
        <React.Fragment>
            
                <div style={{ width: "310px" }}>
                    <Progress2 />
                    <SignUpTitle />
                    <InputComp2 
                           showHideComp1={showHideComp1}
                           setshowHideComp1={setshowHideComp1}
                           showHideComp2={showHideComp2}
                           setshowHideComp2={setshowHideComp2}
                           form={form}
                           setForm={setForm}
                    />
                </div>

        </React.Fragment>
    )
}
