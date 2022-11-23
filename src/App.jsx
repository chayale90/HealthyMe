
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LayoutAdmin from './layoutAdmin/layoutAdmin'
import LoginAdmin from './comps_admin/loginAdmin'
import UsersList from './comps_admin/users/usersList'

function App() {

  return (
    <Router>
      <Routes>


        {/* Admin Layout */}
        <Route path="/admin" element={<LayoutAdmin />} >
          {/* Outlet */}
          <Route path='/admin' element={<LoginAdmin />} />
          <Route path='/admin/users' element={<UsersList />} />
          {/* ******** */}
        </Route>

      </Routes>
    </Router>
  )
}

export default App
