import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LayoutAdmin from './layoutAdmin/layoutAdmin'
import UsersList from './components/admin/users/usersList'
import FoodsList from './components/admin/foods/foodsList'
import Login from './components/auth/loginPage/login'
import CategoriesList from './components/admin/categories/categoriesList'
import EditCategory from './components/admin/categories/editCategory'
import AddCategoryForm from './components/admin/categories/addCategoryForm'
import NotFound from './components/client/notFound'
import FoodsListUser from './components/client/foods/foodsListUser'
import Layout from './layout/layout'

function App() {

  return (
    <Router>
      <Routes>


        <Route path="/" element={<Login />} />

        {/* Client Layout */}
        <Route path="/client" element={<Layout />} >

          {/* Outlet */}
          <Route path='/client/foods' element={<FoodsListUser />} />



          {/* ******** */}

        </Route>



        {/* Admin Layout */}
        <Route path="/admin" element={<LayoutAdmin />} >

          {/* Outlet */}
          <Route path='/admin/users' element={<UsersList />} />
          <Route path='/admin/categories' element={<CategoriesList />} />
          <Route path='/admin/addCategory' element={<AddCategoryForm />} />
          <Route path='/admin/editCategory/:id' element={<EditCategory />} />
          <Route path='/admin/foods' element={<FoodsList />} />
          {/* ******** */}

        </Route>


        {/*   (*) => Rest of routes!?!?  */}
        <Route path='*' element={<NotFound />} />


      </Routes>
    </Router>
  )
}

export default App
