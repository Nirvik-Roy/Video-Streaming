import axios from "axios";
import toast from "react-hot-toast";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetVideo = createAsyncThunk('GetVideo', async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get(`http://localhost:5000/videos`)
        if (res.data.success) {
            return res.data
        }
        console.log(res)
    } catch (err) {
        toast.error(err.response.data.message || err.message || 'Data Fetching Failed');
        console.log('erro')
        return rejectWithValue('Video Fetching Failed')
    }
})

const GetVideoSlice = createSlice({
    name: 'getVideo',
    initialState: {
        isVideoFetching: false,
        isVideoFetchingError: false,
        fetchedVideoData: []
    },
    extraReducers: (builder) => {
        builder.addCase(GetVideo.pending, (state) => {
            state.isVideoFetching = true,
                state.isVideoFetchingError = false
        })
        builder.addCase(GetVideo.fulfilled, (state, action) => {
            state.isVideoFetching = false,
                state.isVideoFetchingError = false,
                state.fetchedVideoData = action.payload?.payload?.videos
                console.log(action.payload)
        })
        builder.addCase(GetVideo.rejected, (state, action) => {
            state.isVideoFetching = false,
                state.isVideoFetchingError = true
            state.fetchedVideoData = []
        })
    }
})

export default GetVideoSlice.reducer