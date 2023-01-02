import { createSlice } from "@reduxjs/toolkit";


// setting the slice his first store/state
const initValue = {
    // items: [],
    arSearch: [],
    // arCategories: [],
    // showHideComp1: true,
    // showHideComp2: false,
    // loading: null
}

const foodsSlice = createSlice({
    name: "foodsSlice",
    initialState: initValue,
    reducers: {
        // setAr: (state, action) => {
        //     state.items = [ ...action.payload.val] 
        // },
        setArSearch: (state, action) => {
            state.arSearch = [ ...action.payload.val] 
        },
        resetArSearch: (state, action) => {
            state.arSearch = [] 
        },
        // addItems: (state, action) => {
        //     state.items = [ ...state.items, ...action.payload.val] 
        //     state.loading = "waiting"
        // },
        // setArCategories: (state, action) => {
        //     state.items = [ ...action.payload.val] 
        // },
        // changeLoading: (state, action) => {
        //     state.loading = action.payload.val
        // }
    }
})

export const { setArSearch,arSearch,resetArSearch} = foodsSlice.actions;
export default foodsSlice.reducer;