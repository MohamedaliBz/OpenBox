import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Login from "../Pages/Login"
import Signup from "../Pages/Signup"
import NotFound from "../Pages/NotFound"
import ForgotPassword from "../Pages/ForgotPassword/forgotPassword"
import ResetPassword from "../Pages/ForgotPassword/resetPassword"
import ForgotPasswordVerif from "../Pages/ForgotPassword/forgotPasswordVerif"
import AccountVerif from "../Pages/AccountVerification"

function AppRoutes() {
    return (
      <Router>
          <Routes>
              <Route path="/" element={<Login/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/accountVerif" element={<AccountVerif/>}/>
              <Route path="/forgotPassword" element={<ForgotPassword/>}/>
              <Route path="/forgotPasswordVerif" element={<ForgotPasswordVerif/>}/>
              <Route path="/resetPassword" element={<ResetPassword/>}/>
              <Route path="*" element={<NotFound/>}/>
          </Routes>
      </Router>
    )
  }
  
  export default AppRoutes


  // zKZrJW0OpMRvJcfJ : supabase password