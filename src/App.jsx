import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LayoutAdmin from './layoutAdmin/layoutAdmin'
import UsersList from './comps_admin/users/usersList'
import FoodsList from './comps_admin/foods/foodsList'
import Login from './assets/loginPage/login'
import CategoriesList from './comps_admin/categories/categoriesList'
import EditCategory from './comps_admin/categories/editCategory'
import AddCategoryForm from './comps_admin/categories/addCategoryForm'

function App() {

  return (
    <Router>
      <Routes>


        <Route path="/" element={<Login />} />


        {/* Admin Layout */}
        <Route path="/admin" element={<LayoutAdmin />} >
          {/* Outlet */}
          <Route path='/admin/users' element={<UsersList />} />
          <Route path='/admin/categories' element={<CategoriesList />} />
          <Route path='/admin/addCategory' element={<AddCategoryForm />} />
          <Route path='/admin/editCategory/:id' element={<EditCategory />} />
          <Route path='/admin/foods' element={<FoodsList/>} />
          {/* ******** */}
        </Route>



        {/* User Layout */}
        {/* <Route path="/user" element={<LayoutAdmin />} > */}
        {/* Outlet */}
         <Route path='/user/foods' element={<FoodsList />} />


        {/* ******** */}
        {/* </Route> */}




      </Routes>
    </Router>
  )
}

export default App
