import React from 'react'
import SignUpTitle from '../signUpTitle'
import ProgressBegin from './progressBegin'
import InputsBeginComp from './inputsBegin'
import BottomBeginComp from './bottomBegin'

export default function SignUpBeginComp() {
    
    return (
        <>
            <ProgressBegin />
            <SignUpTitle />
            <InputsBeginComp />
            <BottomBeginComp/>
        </>
    )
}
