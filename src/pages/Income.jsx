import React from 'react'
import Dashboard from '../components/Dashboard'
import { useUser } from '../hook/useUser'

const Income = () => {
  useUser();
  return (
    <div>
      <Dashboard activeMenu="Income">
        this is income pages
      </Dashboard>
    </div>
  )
}

export default Income