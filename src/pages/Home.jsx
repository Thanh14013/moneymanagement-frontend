import React from 'react'
import Dashboard from '../components/Dashboard'
import { useUser } from '../hook/useUser'

const Home = () => {
  useUser();
  return (
    <div>
      <Dashboard activeMenu="Dashboard" >
        this is home pages
      </Dashboard>
    </div>
  )
}

export default Home