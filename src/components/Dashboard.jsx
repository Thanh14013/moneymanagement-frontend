import React, { useContext } from 'react'
import Menubar from './Menubar'
import { AppContext } from '../context/AppContext'

const Dashboard = () => {

  const { user } = useContext(AppContext);

  return (
    <div>
      <Menubar />

      {user && (
        <div className="flex">
          <div className="max-[1080px]:hidden">
            <div>Sidebar content</div>
          </div>
          <div className="grow mx-5">Right side content</div>
        </div>
      )}

    </div>
  )
}

export default Dashboard