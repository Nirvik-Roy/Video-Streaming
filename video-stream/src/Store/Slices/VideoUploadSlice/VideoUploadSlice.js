import axios from "axios";
import toast from "react-hot-toast";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

export const VideoUpload = createAsyncThunk('VideoUpload', async (videoFile, { dispatch, rejectWithValue }) => {
    if (videoFile) {
        try {
            const formData = new FormData()
            formData.append('file', videoFile)

            const res = await axios.post(`http://localhost:5000/upload`, formData, {
                onUploadProgress: (progressEvent) => {
                    const { loaded, total } = progressEvent;
                    if (total) {
                        const percentage = Math.round((loaded * 100) / total);
                        // dispatch a custom action with the percentage
                        dispatch(uploadProgress(percentage - 20));
                        dispatch(progressDetails())
                    }
                }
            })

            if (res.data.success) {
                toast.success('Video Uploaded Successfully....')
                dispatch(uploadProgress(100))

                return res.data
            }

        } catch (err) {
            toast.error(err.response?.data?.messsage || err.message || 'Video Upload Failed')
            return rejectWithValue('Video Upload Failed')

        }
    } else {
        return rejectWithValue('Video Upload Failed')
    }
})

const VideoUploadSlice = createSlice({
    name: 'videoUpload',
    initialState: {
        isLoading: false,
        isError: false,
        videoSrc: '',
        progress: '',
        serverToClient: false,
        isSuccess: false,
        videoId: ''

    },

    reducers: {
        uploadProgress: (state, action) => {
            state.progress = action.payload
        },
        progressDetails: (state, action) => {
            state.serverToClient = true
        }

    },
    extraReducers: (builder) => {
        builder.addCase(VideoUpload.pending, (state) => {
            state.isLoading = true,
                state.isError = false,
                state.isSuccess = false,
                state.videoId = ''
        })
        builder.addCase(VideoUpload.fulfilled, (state, action) => {
            state.isError = false,
                state.isSuccess = true
            state.videoSrc = action.payload.payload?.videoStreamUrl
            state.videoId = action.payload?.payload?.lessonId
        })
        builder.addCase(VideoUpload.rejected, (state) => {
            state.isError = true,
                state.isLoading = false
            state.isSuccess = false,
                state.videoId = ''
        })
    }
})
export const { uploadProgress, progressDetails } = VideoUploadSlice.actions;
export default VideoUploadSlice.reducer;
