import React from 'react'
import Menubar from './Menubar'
import Sidebar from './Sidebar';

const Dashboard = ({ children, activeMenu }) => {


  return (
    <div className="min-h-screen bg-gray-50">
      <Menubar activeMenu={activeMenu} />
        <div className="flex flex-col lg:flex-row">
          {/* Desktop Sidebar - ẩn trên mobile và tablet */}
          <div className="hidden lg:block lg:w-64 flex-shrink-0">
            <Sidebar activeMenu={activeMenu}/>
          </div>
          <div className="grow mx-5">{children}</div>
        </div>
      

    </div>
  )
}

export default Dashboard