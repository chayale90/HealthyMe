import { createSlice } from "@reduxjs/toolkit";


// setting the slice his first store/state
const initValue = {
    user: {},
    flagEditWeight:false
}

const userSlice = createSlice({
    name: "user",
    initialState: initValue,
    reducers: {
        addUser: (state, action) => {
            state.user = { ...action.payload.val }
        },
        resetUser: (state, action) => {
            state.user = {}
        },
        setFlag:(state, action) => {
            state.flagEditWeight =  !(state.flagEditWeight );
        },
    }
})

export const { addUser, resetUser,setFlag } = userSlice.actions;
export default userSlice.reducer;