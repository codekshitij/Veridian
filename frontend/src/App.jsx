import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute' // Your existing ProtectedRoute
import AuthLayout from '../layouts/AuthLayout' // Your existing AuthLayout
import MainLayout from '../layouts/MainLayout' // Your existing MainLayout
import LoginPage from '../features/auth/pages/LoginPage' // Your existing LoginPage

// Import the actual IdeaCanvasPage component
import IdeaCanvasPage from '../features/ideaCanvas/components/IdeaCanvasPage' // Renamed to RealIdeaCanvasPage to avoid conflict with placeholder
import DashboardPage from '../features/dashboard/pages/DashboardPage' // Your existing DashboardPage
import OKRPage from '../features/okrs/pages/OKRPage'

import './App.css' // Your existing CSS import

// Placeholder components (keep these as placeholders until you implement them)
const SignupPage = () => <div>Signup Page</div>
const CalendarPage = () => <div>Calendar</div>


function App() {
  return (
    <>
      <Routes>
        {/* Public routes with AuthLayout */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>

        {/* Protected routes with MainLayout */}
        <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/okrs" element={<OKRPage />} />
          {/* IMPORTANT: Use the imported RealIdeaCanvasPage here */}
          <Route path="/idea-canvas" element={<IdeaCanvasPage />} />
        </Route>

        {/* Redirect root to dashboard if authenticated, otherwise to login */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        {/* Catch all route - redirect to dashboard if authenticated, otherwise to login */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  )
}

export default App