import axios from "axios";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const BigScreen = () => {
    const { id } = useParams()
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const [videoSrc, setvideoSrc] = useState('')

    //Normally only useeffect will not work because it is calling the videojs before it is actually present in the dom....
    //That's why we should use requestAnimationFrame or setimeout to delay the calling for a few miliseconds and ensure that video.current is present inside the dom...
    useEffect(() => {
        if (videoRef.current && !playerRef.current && videoSrc != '') {
            requestAnimationFrame(() => {  //Request AnimationFrame delays the calling video js for one frame second and ensure that video.current is present in the dom before calling...
                playerRef.current = videojs(videoRef.current, {
                    autoplay: false,
                    controls: true,
                    responsive: true,
                    fluid: true,
                    sources: [
                        {
                            src: videoSrc,
                            type: "application/x-mpegURL",
                        },
                    ],
                });
            });
        }

        return () => {
            if (playerRef.current) {
                playerRef.current.dispose();
                playerRef.current = null;
            }
        };
    }, [videoSrc]);

    const GetVideoById = async () => {
        if (id) {
            try {
                const res = await axios.get(`http://localhost:5000/videos/${id}`);
                if (res.data?.success) {
                    setvideoSrc(res.data?.payload?.videoStreamUrl)
                }
            } catch (err) {
                console.log(err)
            }
        }
    }
    useEffect(() => {
        GetVideoById()
    }, [])


    return (
        <div className="bg-[#1b1b1b] shadow-lg shadow-[#000] rounded-[15px] h-[100vh] mx-auto">
            {/* ✅ Keep Video.js internals safe */}
            <div data-vjs-player>
                <video
                    ref={videoRef}
                    className="video-js vjs-big-play-centered"
                    playsInline
                />
            </div>
        </div>
    );
};

export default BigScreen;
