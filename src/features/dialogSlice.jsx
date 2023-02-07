import { createSlice } from "@reduxjs/toolkit";

// setting the slice his first store/state
const initValue = {
    openFollowers: false,
    openFollowings: false,
    userIdFollowers:"",
    userIdFollowings:"",
}

const dialogSlice = createSlice({
    name: "dialog",
    initialState: initValue,
    reducers: {
        // dialog of followers :
        //change open and close
        setOpenFollowers: (state, action) => {
            state.openFollowers = action.payload.val;
        },
        setOpenFollowings: (state, action) => {
            state.openFollowings = action.payload.val;
        },
        setUserIdFollowers: (state, action) => {
            state.userIdFollowers = action.payload.val;
        },
        setUserIdFollowings: (state, action) => {
            state.userIdFollowings = action.payload.val;
        }
        // addForm: (state, action) => {
        //     state.form = { ...action.payload.val }
        // },
        // addForm2: (state, action) => {
        //     state.form = { ...state.form, ...action.payload.val }
        //     state.loading = "waiting"
        // },
        // resetForm: (state, actions) => {
        //     state.form = {};
        // },
        // changeLoading: (state, action) => {
        //     state.loading = action.payload.val
        // }
    }
})

export const { setOpenFollowers,setOpenFollowings,setUserIdFollowers,setUserIdFollowings } = dialogSlice.actions;
export default dialogSlice.reducer;