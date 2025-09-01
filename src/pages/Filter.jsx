import React from 'react'
import Dashboard from '../components/Dashboard'
import { useUser } from '../hook/useUser'

const Filter = () => {
  useUser();
  return (
    <div>
      <Dashboard activeMenu="Filters">
        this is filter pages
      </Dashboard>
    </div>
  )
}

export default Filter