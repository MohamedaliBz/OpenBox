import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Login from "../Pages/Login"
import Signup from "../Pages/Signup"
import NotFound from "../Pages/NotFound"
import ForgotPassword from "../Pages/ForgotPassword/forgotPassword"
import ResetPassword from "../Pages/ForgotPassword/resetPassword"
import Invent from "../Pages/Home/Inventory"
import Suppliers from "../Pages/Home/Suppliers"
import Users from "../Pages/Home/Users"
import ProtectedRoute from "../Components/ProtectedRoute"
import Clients from "../Pages/Home/Clients"
import ClientOrders from "../Pages/Home/Orders/ClientOrders"
import { Role } from "../Utils/userRoles"
import Dashbord from "../Pages/Home/Dashboard"


function AppRoutes() {
    return (
      <Router>
      <Routes>
        <Route
          path="/inventory"
          element={
            <ProtectedRoute roles={[Role.Admin, Role.StockManager, Role.WarehouseManager]}>
              <Invent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute roles={[Role.Admin]}>
              <Dashbord />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute roles={[Role.Admin]}>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clients"
          element={
            <ProtectedRoute roles={[Role.Admin, Role.StockManager]}>
              <Clients />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clientorders"
          element={
            <ProtectedRoute roles={[Role.Admin, Role.StockManager]}>
              <ClientOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/suppliers"
          element={
            <ProtectedRoute roles={[Role.Admin, Role.WarehouseManager]}>
              <Suppliers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/supplierorders"
          element={
            <ProtectedRoute roles={[Role.Admin, Role.WarehouseManager]}>
              <h1>SupplierOrders</h1>
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
    )
  }
  export default AppRoutes

  // zKZrJW0OpMRvJcfJ : supabase password