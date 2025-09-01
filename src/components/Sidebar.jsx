import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import {User} from 'lucide-react'
import { SIDE_BAR_DATA } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isMobile = false, onItemClick, activeMenu }) => {

    const { user } = useContext(AppContext);

    const navigate = useNavigate();

    const handleItemClick = (path) => {
        navigate(path);
        if (isMobile && onItemClick) {
            onItemClick();
        }
    };

    const sidebarClasses = isMobile 
        ? 'w-full h-auto bg-transparent p-0' 
        : 'w-64 h-[calc(100vh-61px)] bg-white border-gray-200/50 p-5 sticky top-[61px] z-20';

    return (
        <div className={sidebarClasses}>
            <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
                {user?.profileImageUrl ? (
                    <img
                        src={user?.profileImageUrl || ""}
                        alt="profile image"
                        className="w-20 h-20 rounded-full bg-slate-400"
                    />
                ) : (
                    <User className="w-20 h-20 text-xl" />
                )}
                <h5 className="text-gray-950 font-medium leading-6">
                    {user.fullName || ""}
                </h5>
            </div>

            {
                SIDE_BAR_DATA.map((item, index) => (
                    <button 
                        onClick={() => handleItemClick(item.path)} 
                        key={`menu_${index}`} 
                        className={`cursor-pointer w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 transition-colors ${activeMenu === item.label ? 'bg-purple-800 text-white' : ''}`}
                    >
                        <item.icon className="text-xl" />
                        {item.label}
                    </button>
                ))
            }

        </div>
    )
}

export default Sidebar