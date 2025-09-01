import React, { useContext } from 'react'
import Menubar from './Menubar'
import Sidebar from './Sidebar';
import { AppContext } from '../context/AppContext';

const Dashboard = ({ children, activeMenu }) => {

  const { user } = useContext(AppContext);

  return (
    <div className="min-h-screen bg-gray-50">
      <Menubar activeMenu={activeMenu} />

      {
        user && (
          <div className="flex flex-col lg:flex-row">
            {/* Desktop Sidebar - ẩn trên mobile và tablet */}
            <div className="hidden lg:block lg:w-64 flex-shrink-0">
              <Sidebar activeMenu={activeMenu} />
            </div>
            <div className="grow mx-5">{children}</div>
          </div>
        )
      }


    </div>
  )
}

export default Dashboard