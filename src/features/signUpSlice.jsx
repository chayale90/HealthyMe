import { createSlice } from "@reduxjs/toolkit";


// setting the slice his first store/state
const initValue = {
    form: {},
    showHideComp1: true,
    showHideComp2: false,
    loading: null
}

const signUpSlice = createSlice({
    // name -> שם בזכרון של הסלייס והדיבאגר
    name: "signUp",
    // מאפיין שמכיל את הסטייט ההתחלתי של הסלייס
    initialState: initValue,
    // יכיל את הפונקציות/אקשנים שישפיעו על הסטייט של הסלייס
    reducers: {
        setShowHideComp1: (state, action) => {
            state.showHideComp1 = (!state.showHideComp1);
        },
        setShowHideComp2: (state, action) => {
            state.showHideComp2 = (!state.showHideComp2);
        },
        // actions -> משמש כדי לאסוף פרמטרים מהאקשן
        // ששיגרנו , ותמיד המאפיין של האובייקט יהיה בתוך מאפיין
        // PAYLOAD - מטען
        addForm: (state, action) => {
            state.form = { ...action.payload.val }
        },
        addForm2: (state, action) => {
            state.form = { ...state.form, ...action.payload.val }
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

export const { setShowHideComp1, setShowHideComp2, addForm,addForm2, resetForm, changeLoading } = signUpSlice.actions;
export default signUpSlice.reducer;