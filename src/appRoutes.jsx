import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CategoriesList from './components/admin/categories/categoriesList'
import AddCategoryForm from './components/admin/categories/addCategoryForm'
import EditCategory from './components/admin/categories/editCategory'
import Layout from './layout/layout'
import NotFound from './components/general_comps/notFound'
import LayoutAdmin from './layoutAdmin/layoutAdmin'
import UsersListAdmin from './components/admin/users/usersListAdmin'
import FoodsListAdmin from './components/admin/foods/foodsListAdmin'

//for toast container you need the container will be in app and his css
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

// import UploadTest from './assets/uploadTest'
import LoginPage from './components/auth/loginPage/loginPage'
import SignUpPage from './components/auth/signUpComps/signUpPage'
import FoodsPage from './components/client/foods/foodsPage'
import MyProfilePage from './components/client/myProfile/myProfilePage'
import UserProfilePage from './components/client/userProfile/userProfilePage'
import AddFood from './components/client/foods/addFood/addFood'
import FoodInfo from './components/client/foods/foodInfo/foodInfo'
import MyFoodInfo from './components/client/foods/foodInfo/myFoodInfo'
import EditFood from './components/client/foods/editFood/editFood'
import EditMyDetails from './components/client/myProfile/editMyProfile/editMyDetails'
import MyFavoriteList from './components/client/myFavorites/myFavoriteList'


export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route index element={<LoginPage />} />
                <Route path='/signUp' element={<SignUpPage />} />

                {/* Client Layout */}
                <Route path='/' element={<Layout />} >
                    {/* Outlet */}
                    <Route path='/foods' element={<FoodsPage />} />
                    <Route path='/myProfile' element={<MyProfilePage />} />
                    <Route path='/editMyDetails' element={<EditMyDetails />} />

                    <Route path='/userProfile/:id' element={<UserProfilePage />} />

                    <Route path='/addFood' element={<AddFood />} />
                    <Route path='/foodInfo/:id' element={<FoodInfo />} />
                    <Route path='/myFoodInfo/:id' element={<MyFoodInfo />} />
                    <Route path='/editFood/:id' element={<EditFood />} />


                    <Route path='/myFavorites' element={<MyFavoriteList />} />

                    {/* ******** */}
                </Route>


                {/* Admin Layout */}
                <Route path="/admin" element={<LayoutAdmin />} >
                    {/* Outlet */}
                    <Route path='/admin/users' element={<UsersListAdmin />} />
                    <Route path='/admin/categories' element={<CategoriesList />} />
                    <Route path='/admin/addCategory' element={<AddCategoryForm />} />
                    <Route path='/admin/editCategory/:id' element={<EditCategory />} />
                    <Route path='/admin/foods' element={<FoodsListAdmin />} />
                    {/* <Route path='/admin/upload' element={<UploadTest />} /> */}
                    {/* ******** */}

                </Route>


                {/*   (*) => Rest of routes!?!?  */}
                <Route path='*' element={<NotFound />} />


            </Routes>
            <ToastContainer position="top-left" theme="colored" />
        </Router>
    )

}
