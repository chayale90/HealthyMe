import { createSlice } from "@reduxjs/toolkit";


// setting the slice his first store/state
const initValue = {
    arSearch: [],
}

const foodsSlice = createSlice({
    name: "foodsSlice",
    initialState: initValue,
    reducers: {
        setArSearch: (state, action) => {
            state.arSearch = [ ...action.payload.val] 
        },
        resetArSearch: (state, action) => {
            state.arSearch = [] 
        },
    }
})

export const { setArSearch,arSearch,resetArSearch} = foodsSlice.actions;
export default foodsSlice.reducer;