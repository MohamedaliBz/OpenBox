import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Login from "../Pages/Login"
import Signup from "../Pages/Signup"
import NotFound from "../Pages/NotFound"
import ForgotPassword from "../Pages/ForgotPassword/forgotPassword"
import ResetPassword from "../Pages/ForgotPassword/resetPassword"
import Invent from "../Pages/Home/Inventory"
import Dashboard from "../Pages/Home/Dashboard"
import Suppliers from "../Pages/Home/Suppliers"
import Users from "../Pages/Home/Users"
import ProtectedRoute from "../Components/ProtectedRoute"
import Clients from "../Pages/Home/Clients"
import ClientOrders from "../Pages/Home/Orders/ClientOrders"


function AppRoutes() {
    return (
      <Router>
          <Routes>
            <Route path="/inventory" 
            element={<ProtectedRoute>
                        <Invent/>
                      </ProtectedRoute>}
            />
            <Route path="/dashboard" 
            element={<ProtectedRoute>
                        <Dashboard/>
                      </ProtectedRoute>}
            />
            <Route path="/suppliers" 
            element={<ProtectedRoute>
                        <Suppliers/>
                      </ProtectedRoute>}
            />
            <Route path="/users" 
            element={<ProtectedRoute>
                        <Users/>
                      </ProtectedRoute>}
            />
            <Route path="/clients" 
            element={<ProtectedRoute>
                        <Clients/>
                      </ProtectedRoute>}
            />
            <Route path="/clientorders" 
            element={<ProtectedRoute>
                        <ClientOrders/>
                      </ProtectedRoute>}
            />
            <Route path="/supplierorders" 
            element={<ProtectedRoute>

                      </ProtectedRoute>}
            />
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