import { createSlice } from "@reduxjs/toolkit";


// setting the slice his first store/state
const initValue = {
    items: [],
    arCategories: [],
    showHideComp1: true,
    showHideComp2: false,
    loading: null
}

const foodsSlice = createSlice({
    name: "foodsSlice",
    initialState: initValue,
    reducers: {
        setAr: (state, action) => {
            state.items = [ ...action.payload.val] 
        },
        addItems: (state, action) => {
            state.items = [ ...state.items, ...action.payload.val] 
            state.loading = "waiting"
        },
        setArCategories: (state, action) => {
            state.items = [ ...action.payload.val] 
        },
        changeLoading: (state, action) => {
            state.loading = action.payload.val
        }
    }
})

export const {setAr,setArCategories, addItems, changeLoading } = foodsSlice.actions;
export default foodsSlice.reducer;