import { createSlice } from "@reduxjs/toolkit";


// setting the slice his first store/state
const initValue = {
    form: {},
    formBegin:{},
    isShowBeginComp:true,
    isShowEndComp: false,
    loading: null
}

const signUpSlice = createSlice({
    name: "signUp",
    initialState: initValue,
    reducers: {
        setIsShowBeginComp: (state, action) => {
            state.isShowBeginComp = (!state.isShowBeginComp);
        },
        setIsShowEndComp: (state, action) => {
            state.isShowEndComp = (!state.isShowEndComp);
        },
        addForm: (state, action) => {
            state.form = { ...action.payload.val }
            state.formBegin = { ...action.payload.val }
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
        resetFormBegin: (state, actions) => {
            state.formBegin = {};
        },
    }
})

export const { setIsShowBeginComp, setIsShowEndComp, addForm,addForm2, resetForm, changeLoading,resetFormBegin } = signUpSlice.actions;
export default signUpSlice.reducer;