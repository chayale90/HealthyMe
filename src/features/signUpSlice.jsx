import { createSlice } from "@reduxjs/toolkit";


// setting the slice his first store/state
const initValue = {
    form: {},
    formComp1:{},
    showHideComp1: true,
    showHideComp2: false,
    loading: null
}

const signUpSlice = createSlice({
    name: "signUp",
    initialState: initValue,
    reducers: {
        setShowHideComp1: (state, action) => {
            state.showHideComp1 = (!state.showHideComp1);
        },
        setShowHideComp2: (state, action) => {
            state.showHideComp2 = (!state.showHideComp2);
        },
        addForm: (state, action) => {
            state.form = { ...action.payload.val }
            state.formComp1 = { ...action.payload.val }
            delete state.form.password2;
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
        }, 
        resetForm1: (state, actions) => {
            state.formComp1 = {};
        },
    }
})

export const { setShowHideComp1, setShowHideComp2, addForm,addForm2, resetForm, changeLoading,resetForm1 } = signUpSlice.actions;
export default signUpSlice.reducer;