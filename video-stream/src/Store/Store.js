import { configureStore } from "@reduxjs/toolkit";
import VideoUploadSlice from './Slices/VideoUploadSlice/VideoUploadSlice'
import GetVideoSlice from './Slices/GetVideosSlice/GetVideoSlice'
const Store = configureStore({
    reducer: {

        videoUpload: VideoUploadSlice,
        getVideo:GetVideoSlice
    }
})

export default Store