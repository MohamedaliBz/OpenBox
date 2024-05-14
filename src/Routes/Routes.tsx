import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Login from "../Pages/Login"
import Signup from "../Pages/Signup"
import NotFound from "../Pages/NotFound"
import ForgotPassword from "../Pages/ForgotPassword/forgotPassword"
import ResetPassword from "../Pages/ForgotPassword/resetPassword"
import Invent from "../Pages/Home/Inventory"
import Dashboard from "../Pages/Home/Dashboard"


function AppRoutes() {
    return (
      <Router>
          <Routes>
            <Route path="/inventory" element={<Invent/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/" element={<Login/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/forgotPassword" element={<ForgotPassword/>}/>
            <Route path="/resetPassword" element={<ResetPassword/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
      </Router>
    )
  }
  export default AppRoutes

  // zKZrJW0OpMRvJcfJ : supabase password