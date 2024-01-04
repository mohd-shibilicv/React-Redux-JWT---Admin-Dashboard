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

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<AuthenticatedRouter><Signin /></AuthenticatedRouter>} />
        <Route path="/signup" element={<AuthenticatedRouter><Signup /></AuthenticatedRouter>} />
        <Route path="/profile" element={<PrivateRouter><Profile /></PrivateRouter>} />
      </Routes>
    </Router>
  )
}

export default App