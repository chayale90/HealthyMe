import './App.css'
import AppRoutes from './appRoutes'
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import signUpSlice from "./features/signUpSlice"
import userSlice from "./features/userSlice"
import loadingSlice from "./features/userSlice"

export const myStore = configureStore({
  reducer: {
    signUpSlice,
    userSlice,
    loadingSlice
  }
})

function App() {
  return (
    <Provider store={myStore}>
      <AppRoutes />
    </Provider>
  )
}

export default App
