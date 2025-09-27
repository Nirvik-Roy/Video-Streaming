import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BigScreen from "./BigScreen";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { GetVideo } from "./Store/Slices/GetVideosSlice/GetVideoSlice";
import thumbnail from './assets/video_thumbnails_header_image-png.png'
const VideoApp = () => {
  const navigate = useNavigate()
  const { fetchedVideoData } = useSelector(state => state.getVideo)

  const Card = ({ v }) => (
    <article onClick={(() => navigate(`/single-video/${v.lessonId}`))} className="bg-[#1b1b1b] rounded-2xl border border-[#2a2a2a] shadow-[0_8px_20px_rgba(0,0,0,0.35)] overflow-hidden hover:border-[#3a3a3a] transition">
      <div className="relative">
        {v.type === "embed" ? (
          <div className="w-full aspect-video bg-black">
            <iframe
              title={v.title}
              src={v.embedUrl}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="w-full aspect-video">
            <img
              src={thumbnail}
              alt={v.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <span className="absolute bottom-2 right-2 text-[12px] font-semibold bg-black/80 text-white px-2 py-0.5 rounded-md">
          {v.duration}
        </span>
      </div>

      <div className="px-5 pt-3 pb-4">
        <h3 className="text-[18px] font-semibold leading-snug mb-2">
          Your Uploaded Video
        </h3>
      </div>
    </article>
  );

  return (
    <>

      <div className="min-h-screen bg-[#121212] text-white">
        {/* Top bar */}
        <header className="sticky top-0 z-50 bg-[#181818] border-b border-[#2a2a2a]">
          <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
            <div className="text-3xl font-extrabold tracking-tight">
              <span className="text-red-500">Video</span>
              <span className="text-white">Stream</span>
            </div>

            <nav className="flex items-center gap-3">
              <button className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition">
                <i className="fa-solid fa-circle-play"></i>
                All Videos
              </button>
              <button onClick={(() => navigate('/upload'))} className="inline-flex items-center gap-2 text-[#e7e7e7] hover:text-white text-sm px-3 py-2 rounded-lg transition">
                <i className="fa-solid fa-upload"></i>
                Upload
              </button>
            </nav>
          </div>
        </header>
        {/* Content */}
        <main className="max-w-[1400px] mx-auto px-6 py-10">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-8">
            Videos Uploaded By You
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {fetchedVideoData.length > 0 ? fetchedVideoData?.map((item) => (
              <Card key={item._id} v={item} />
            )) : <p style={{
              fontSize: "20px",
              fontWeight: '600'

            }}>No videos uploaded ....</p>}

          </div>
        </main>
      </div>
    </>
  );
};



export default VideoApp;