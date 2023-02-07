import { createSlice } from "@reduxjs/toolkit";


// all little things in ui
const initValue = {
    home: 'none',
    favorites: 'none',
    loadingImg:true
}

const homeSlice = createSlice({
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
        }
    }
})

export const { changeFavorites,changeHome,changeLoading} = homeSlice.actions;
export default homeSlice.reducer;