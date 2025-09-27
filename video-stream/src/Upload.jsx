import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { VideoUpload } from "./Store/Slices/VideoUploadSlice/VideoUploadSlice"
import ProgressBar from "./ProgressBar"
import { useEffect, useState } from "react"
const Upload = () => {
    const navigate = useNavigate()
    const { isLoading, isError, progress, isSuccess, videoId } = useSelector(state => state.videoUpload)
    const dispatch = useDispatch()
    const [progressBar, setProgressBar] = useState(false);
    const HandleChange = (e) => {
        const file = e.target.files[0];
        console.log(file)
        if (file) {
            dispatch(VideoUpload(file))
        }
    }
    useEffect(() => {
        if (isLoading) {
            setProgressBar(true)
        }
        if (progress === 100) {
            setTimeout(() => {
                setProgressBar(false)
            }, 2000)
        }
    }, [isLoading, progress])

    useEffect(() => {
        if (isSuccess) {
            navigate(`/single-video/${videoId}`)
        }
    }, [isSuccess])
    return (
        <>
            {progressBar && <ProgressBar />}
            <div className="min-h-screen bg-[#121212] text-white">
                {/* Header */}
                <header className="sticky top-0 z-50 bg-[#181818] border-b border-[#2a2a2a]">
                    <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
                        <div className="text-3xl font-extrabold tracking-tight">
                            <span className="text-red-500">Video</span>
                            <span className="text-white">Stream</span>
                        </div>

                        <nav className="flex items-center gap-3">
                            <button onClick={(() => navigate('/'))} className="inline-flex items-center gap-2 text-[#e7e7e7] hover:text-white text-sm px-3 py-2 rounded-lg transition">
                                <i className="fa-solid fa-globe"></i>
                                All Videos
                            </button>

                            <button className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition">
                                <i className="fa-solid fa-upload"></i>
                                Upload
                            </button>
                        </nav>
                    </div>
                </header>

                {/* Main */}
                <main className="max-w-[1200px] mx-auto px-6 py-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-center mb-10">
                        Upload Your Video
                    </h1>

                    {/* Dropzone (UI only) */}
                    <div className="mx-auto max-w-3xl">
                        <label htmlFor="fileInput" className="block group cursor-pointer select-none">
                            <div className="rounded-2xl border-2 border-dashed border-red-500 p-1 transition">
                                <div className="rounded-2xl bg-[#1b1b1b] border border-[#2a2a2a] px-8 py-12 text-center group-hover:bg-[#1f1f1f] transition">
                                    <div className="mb-5 flex justify-center">
                                        <i className="fa-solid fa-upload text-red-500 text-4xl"></i>
                                    </div>

                                    <p className="text-2xl font-semibold mb-1">Drop your video here</p>
                                    <p className="text-[15px] text-[#cfcfcf] mb-6">or click to browse files</p>

                                    <div className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-semibold px-5 py-3 rounded-lg transition">
                                        <i className="fa-solid fa-plus"></i>
                                        <span>Choose File</span>
                                    </div>

                                    <p className="text-sm text-[#bdbdbd] mt-5">
                                        Supports MP4, AVI, MOV
                                    </p>
                                </div>
                            </div>

                            {/* Hidden input (no functionality required) */}
                            <input onChange={HandleChange} id="fileInput" type="file" accept="video/*" className="hidden" />
                        </label>
                    </div>
                </main>
            </div>
        </>
    )
}

export default Upload
