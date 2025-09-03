import React from 'react'

const InfoCard = ({icon, label, value, color}) => {
  return (
    <div className='flex items-center gap-4 p-4 bg-white rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50'>
        <div className={`w-12 h-12 flex items-center justify-center text-[22px] text-white ${color} rounded-full drop-shadow-xl`}>
            {icon}
        </div>
        <div className="flex flex-col">
            <h6 className="text-sm text-gray-500 mb-1">
                {label}
            </h6>
            <span className='font-semibold text-[18px]'>{value}</span>
        </div>
    </div>
  )
}

export default InfoCard