import './App.css'
import AppRoutes from './appRoutes'
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import signUpSlice from "./features/signUpSlice"
import userSlice from "./features/userSlice"
import foodsSlice from "./features/foodsSlice"
import featuresSlice from "./features/featuresSlice"
import dialogSlice from "./features/dialogSlice"

export const myStore = configureStore({
  reducer: {
    signUpSlice,
    userSlice,
    foodsSlice,

    //for home and favorite options
    featuresSlice,

    dialogSlice
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
