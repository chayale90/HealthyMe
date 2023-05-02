import { createSlice } from "@reduxjs/toolkit";


// all little things in ui
const initValue = {
    home: 'none',
    favorites: 'none',
    loadingImg:true,
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
        //update the img of food when edit food
        changeLoading: (state, action) => {
            state.loading = !(state.loading )
        },
        changeDarkMode: (state, action) => {
            state.darkMode = !(state.darkMode )
        }
    }
})

export const { changeFavorites,changeHome,changeLoading,changeDarkMode} = featuresSlice.actions;
export default featuresSlice.reducer;