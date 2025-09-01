import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Category from './pages/Category'
import Income from './pages/Income'
import Expense from './pages/Expense'
import Filter from './pages/Filter'
import {Toaster} from 'react-hot-toast'

const App = () => {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/category" element={<Category />} />
          <Route path="/income" element={<Income />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/expense" element={<Expense />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

const Root = () => {
  const isAuth = localStorage.getItem("token");
  return isAuth ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  )
}

export default App