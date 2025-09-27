import { useEffect, useState } from 'react'
import './App.css'
import VideoApp from './VideoApp'
import Upload from './Upload'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import BigScreen from './BigScreen'
import { useDispatch } from 'react-redux'
import { GetVideo } from './Store/Slices/GetVideosSlice/GetVideoSlice'

function App() {
  const dispatch = useDispatch()
 useEffect(()=>{
   dispatch(GetVideo())
 },[])
  return (
    <>
      <Toaster position='top-center'/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<VideoApp />} />
          <Route path='/upload' element={<Upload />} />
          <Route path='/single-video/:id' element={<BigScreen/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
