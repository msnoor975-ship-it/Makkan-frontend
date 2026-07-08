import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import ChangePassword from './pages/ChangePassword'
import NotAuthorized from './pages/NotAuthorized'
import Help from './pages/Help'
import About from './pages/About'
import Contact from './pages/Contact'
import Properties from './pages/Properties'
import PropertyDetail from './pages/PropertyDetail'
import FAQ from './pages/FAQ'
import Services from './pages/Services'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Cookies from './pages/Cookies'
import Agents from './pages/Agents'
import Blog from './pages/Blog'
import ProtectedRoute from './components/ProtectedRoute'
import MainLayout from './layouts/MainLayout'
import CustomerList from './pages/customers/CustomerList'
import AddCustomer from './pages/customers/AddCustomer'
import CustomerProfile from './pages/customers/CustomerProfile'
import EditCustomer from './pages/customers/EditCustomer'
import HomeownerList from './pages/homeowners/HomeownerList'
import AddHomeowner from './pages/homeowners/AddHomeowner'
import HomeownerProfile from './pages/homeowners/HomeownerProfile'
import HouseList from './pages/houses/HouseList'
import AddHouse from './pages/houses/AddHouse'
import HouseProfile from './pages/houses/HouseProfile'
import EditHouse from './pages/houses/EditHouse'
import SearchAndReserve from './pages/reservations/SearchAndReserve'
import ReservationList from './pages/reservations/ReservationList'
import AddFinancialEntry from './pages/finance/AddFinancialEntry'
import FinancialReport from './pages/finance/FinancialReport'
import UserManagement from './pages/admin/UserManagement'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/houses/:id" element={<PropertyDetail />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/services" element={<Services />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/not-authorized" element={<NotAuthorized />} />
          
          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="help" element={<Help />} />
          </Route>
          
          <Route
            path="/customers"
            element={
              <ProtectedRoute allowedRoles={['sales_employee', 'rental_employee', 'manager', 'secretary']}>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<CustomerList />} />
          </Route>
          
          <Route
            path="/customers/add"
            element={
              <ProtectedRoute allowedRoles={['sales_employee', 'rental_employee', 'manager']}>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AddCustomer />} />
          </Route>
          
          <Route
            path="/customers/:id"
            element={
              <ProtectedRoute allowedRoles={['sales_employee', 'rental_employee', 'manager', 'secretary']}>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<CustomerProfile />} />
          </Route>
          
          <Route
            path="/customers/:id/edit"
            element={
              <ProtectedRoute allowedRoles={['sales_employee', 'rental_employee', 'manager']}>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<EditCustomer />} />
          </Route>
          
          <Route
            path="/homeowners"
            element={
              <ProtectedRoute allowedRoles={['sales_employee', 'rental_employee', 'manager', 'secretary']}>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<HomeownerList />} />
          </Route>
          
          <Route
            path="/homeowners/add"
            element={
              <ProtectedRoute allowedRoles={['sales_employee', 'rental_employee', 'manager']}>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AddHomeowner />} />
          </Route>
          
          <Route
            path="/homeowners/:id"
            element={
              <ProtectedRoute allowedRoles={['sales_employee', 'rental_employee', 'manager', 'secretary']}>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<HomeownerProfile />} />
          </Route>
          
          <Route
            path="/houses"
            element={
              <ProtectedRoute allowedRoles={['sales_employee', 'rental_employee', 'manager']}>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<HouseList />} />
          </Route>
          
          <Route
            path="/houses/add"
            element={
              <ProtectedRoute allowedRoles={['sales_employee', 'rental_employee', 'manager']}>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AddHouse />} />
          </Route>
          
          <Route
            path="/houses/:id"
            element={
              <ProtectedRoute allowedRoles={['sales_employee', 'rental_employee', 'manager']}>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<HouseProfile />} />
          </Route>
          
          <Route
            path="/houses/:id/edit"
            element={
              <ProtectedRoute allowedRoles={['sales_employee', 'rental_employee', 'manager']}>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<EditHouse />} />
          </Route>
          
          <Route
            path="/reservations"
            element={
              <ProtectedRoute allowedRoles={['sales_employee', 'rental_employee', 'manager']}>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<ReservationList />} />
          </Route>
          
          <Route
            path="/reservations/search"
            element={
              <ProtectedRoute allowedRoles={['sales_employee', 'rental_employee', 'manager']}>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<SearchAndReserve />} />
          </Route>
          
          <Route
            path="/finance/report"
            element={
              <ProtectedRoute allowedRoles={['manager', 'secretary']}>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<FinancialReport />} />
          </Route>
          
          <Route
            path="/finance/add"
            element={
              <ProtectedRoute allowedRoles={['manager', 'secretary']}>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AddFinancialEntry />} />
          </Route>

          {/* Manager Routes - User Management */}
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute allowedRoles={['manager']}>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<UserManagement />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
