import { createSlice } from "@reduxjs/toolkit";


// all little things in ui
const initValue = {
    home: 'none',
    favorites: 'none',
    darkMode:false
}

const featuresSlice = createSlice({
    name: "home",
    initialState: initValue,
    reducers: {
        changeHome: (state, action) => {
            state.home = action.payload.val
        },
        changeFavorites: (state, action) => {
            state.favorites = action.payload.val
        },
        changeDarkMode: (state, action) => {
            state.darkMode = !(state.darkMode )
        }
    }
})

export const { changeFavorites,changeHome,changeDarkMode} = featuresSlice.actions;
export default featuresSlice.reducer;