import React from 'react'

import Progress1 from './progress1'
import SignUpTitle from '../signUpTitle'
import InputsComp1 from './inputsComp1'

export default function SignUpComp1({
    showHideComp1,
    setshowHideComp1,
    showHideComp2,
    setshowHideComp2,
    form,
    setForm
}) {
    
    return (

        <div>
            <Progress1 />
            <SignUpTitle />

            <InputsComp1

                showHideComp1={showHideComp1}
                setshowHideComp1={setshowHideComp1}
                showHideComp2={showHideComp2}
                setshowHideComp2={setshowHideComp2}
                form={form}
                setForm={setForm}
            />
        </div>



    )
}
