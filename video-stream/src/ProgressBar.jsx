import React from 'react'
import { useSelector } from 'react-redux'

const ProgressBar = () => {
    const { progress, serverToClient } = useSelector(state => state.videoUpload)

    return (
        <>
            <div className='fixed top-0 left-0 w-[100%] h-[100vh] bg-[rgba(0,0,0,0.8)]' style={{
                zIndex: "99"
            }}></div>
            <div className='fixed top-[50%] left-[50%] w-fit' style={{
                zIndex: '999',
                transform: 'translate(-50%,-50%)'
            }}>
                <p className='text-[#fff] text-center text-[28px] font-[600] mb-[10px]'>{progress}%</p>
                <div className=' w-[500px] h-[25px] bg-[#fff] flex items-center pr-[5px] pl-[5px]' >
                    <div className='h-[80%] bg-[red]' style={{
                        width: `${progress}%`,
                    }}></div>
                </div>
                {!serverToClient && <p className='text-[#fff] text-center text-[14px] font-[600] mt-[10px]'>Uploading....</p>}
                {(serverToClient && progress != 100) && <p className='text-[#fff] text-center text-[14px] font-[600] mt-[10px]'>This might take a few minutes...</p>}
                {progress === 100 && <p className='text-[#fff] text-center text-[14px] font-[600] mt-[10px]'>Successfully Uploaded</p>}
            </div>
        </>
    )
}

export default ProgressBar
