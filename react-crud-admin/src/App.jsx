import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Header from './components/Header'
import PrivateRouter from './components/Redirects/PrivateRouter'
import AuthenticatedRouter from './components/Redirects/AuthenticatedRouter'
import ProfileUpdate from './pages/ProfileUpdate'
import Error404 from './pages/Error404'
import Dashboard from './pages/Dashboard.jsx'

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<AuthenticatedRouter><Signin /></AuthenticatedRouter>} />
        <Route path="/signup" element={<AuthenticatedRouter><Signup /></AuthenticatedRouter>} />
        <Route path="/dashboard" element={<PrivateRouter><Dashboard /></PrivateRouter>} />
        <Route path="/profile" element={<PrivateRouter><Profile /></PrivateRouter>} />
        <Route path="/update-profile" element={<PrivateRouter><ProfileUpdate /></PrivateRouter>} />
        <Route path='*' element={<Error404 />} />
      </Routes>
    </Router>
  )
}

export default App