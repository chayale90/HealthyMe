import { createSlice } from "@reduxjs/toolkit";

// setting the slice his first store/state
const initValue = {
    openFollowers: false,
    openFollowings: false,
    userIdFollowers:"",
    userIdFollowings:"",
    openUsersLikes:false,
    openEditWeight: false,
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
        },
        setOpenUsersLikes: (state, action) => {
            state.openUsersLikes = action.payload.val;
        },
        setOpenEditWeight: (state, action) => {
            state.openEditWeight = action.payload.val;
        },
      
    }
  
})

export const { setOpenFollowers,setOpenFollowings,setUserIdFollowers,setUserIdFollowings,setOpenUsersLikes ,setOpenEditWeight} = dialogSlice.actions;
export default dialogSlice.reducer;