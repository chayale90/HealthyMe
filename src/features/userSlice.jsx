import { createSlice } from "@reduxjs/toolkit";


// setting the slice his first store/state
const initValue = {
    user: {}
}

const userSlice = createSlice({
    name: "user",
    initialState: initValue,
    reducers: {
        // actions -> משמש כדי לאסוף פרמטרים מהאקשן
        // ששיגרנו , ותמיד המאפיין של האובייקט יהיה בתוך מאפיין
        // PAYLOAD - מטען
        addUser: (state, action) => {
            state.user = { ...action.payload.val }
        },
        resetUser: (state, action) => {
            state.user = {}
        }
    }
})

export const { addUser ,resetUser} = userSlice.actions;
export default userSlice.reducer;