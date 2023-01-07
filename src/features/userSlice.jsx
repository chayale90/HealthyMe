import { createSlice } from "@reduxjs/toolkit";


// setting the slice his first store/state
const initValue = {
    user: {},
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
        }
    }
})

export const { addUser, resetUser } = userSlice.actions;
export default userSlice.reducer;