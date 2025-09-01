import React from 'react'
import Dashboard from '../components/Dashboard'
import { useUser } from '../hook/useUser'

const Expense = () => {
  useUser();
  return (
    <div>
      <Dashboard activeMenu="Expense">
        this is expense pages
      </Dashboard>
    </div>
  )
}

export default Expense
