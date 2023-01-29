import { createSlice } from "@reduxjs/toolkit";


// all little things in ui
const initValue = {
    home: 'none',
    favorites: 'none'
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
        }
    }
})

export const { changeFavorites,changeHome} = homeSlice.actions;
export default homeSlice.reducer;