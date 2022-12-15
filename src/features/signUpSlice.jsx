import { createSlice } from "@reduxjs/toolkit";

// setting the slice his first store/state
const initValue = {
    form: {},
    showHideComp1: true,
    showHideComp2: false,
    counter: 88,
}

const signUpSlice = createSlice({
    // name -> שם בזכרון של הסלייס והדיבאגר
    name: "signUp",
    // מאפיין שמכיל את הסטייט ההתחלתי של הסלייס
    initialState: initValue,
    // יכיל את הפונקציות/אקשנים שישפיעו על הסטייט של הסלייס
    reducers: {
        setShowHideComp1: (state, actions) => {
            state.showHideComp1 = (!state.showHideComp1);
        },
        setShowHideComp2: (state, actions) => {
            state.showHideComp2 = (!state.showHideComp2);
        },
        // actions -> משמש כדי לאסוף פרמטרים מהאקשן
        // ששיגרנו , ותמיד המאפיין של האובייקט יהיה בתוך מאפיין
        // PAYLOAD - מטען
        addForm: (state, actions) => {
            state.form = { ...state.form ,...actions.payload.val };
        },
        resetForm: (state, actions) => {
            state.form = {};
        },
        add1: (state, actions) => {
            state.counter++;
        }
    }
})

export const { setShowHideComp1, setShowHideComp2, addForm,resetForm, add1 } = signUpSlice.actions;
export default signUpSlice.reducer;