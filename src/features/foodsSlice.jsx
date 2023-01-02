import { createSlice } from "@reduxjs/toolkit";


// setting the slice his first store/state
const initValue = {
    items: [],
    showHideComp1: true,
    showHideComp2: false,
    loading: null
}

const foodsSlice = createSlice({
    // name -> שם בזכרון של הסלייס והדיבאגר
    name: "loading",
    // מאפיין שמכיל את הסטייט ההתחלתי של הסלייס
    initialState: initValue,
    // יכיל את הפונקציות/אקשנים שישפיעו על הסטייט של הסלייס
    reducers: {
     
        // actions -> משמש כדי לאסוף פרמטרים מהאקשן
        // ששיגרנו , ותמיד המאפיין של האובייקט יהיה בתוך מאפיין
        // PAYLOAD - מטען
        // addForm: (state, action) => {
        //     state.form = { ...action.payload.val }
        // },
        addItems: (state, action) => {
            state.items = { ...state.items, ...action.payload.val }
            state.loading = "waiting"
        },
        resetForm: (state, actions) => {
            state.form = {};
        },
        changeLoading: (state, action) => {
            state.loading = action.payload.val
        }
    }
})

export const { addItems, changeLoading } = foodsSlice.actions;
export default foodsSlice.reducer;