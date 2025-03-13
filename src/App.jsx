import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AnimatePresence } from 'framer-motion'
import { setUser } from './store/authSlice'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'
import VerifyOTP from './pages/auth/VerifyOTP'
import Chat from './pages/chat'
import PrivateRoute from './components/PrivateRoute'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    // Check for stored user data
    const user = localStorage.getItem('user')
    if (user) {
      dispatch(setUser(JSON.parse(user)))
    }
  }, [dispatch])

  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify" element={<VerifyOTP />} />
        <Route path="/chat/*" element={<PrivateRoute><Chat /></PrivateRoute>} />
        <Route path="/" element={<Navigate to="/chat" replace />} />
      </Routes>
    </AnimatePresence>
  )
}

export default App