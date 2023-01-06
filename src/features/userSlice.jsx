import { createSlice } from "@reduxjs/toolkit";


// setting the slice his first store/state
const initValue = {
    user: {},
    home: 'block',
    favorites: 'none'
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
        },
        changeHome: (state, action) => {
            state.home = action.payload.val
        },
        changeFavorites: (state, action) => {
            state.favorites = action.payload.val
        }
    }
})

export const { addUser, resetUser ,changeFavorites,changeHome} = userSlice.actions;
export default userSlice.reducer;