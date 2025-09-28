"use client";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlinePlayCircle, AiOutlinePauseCircle, AiOutlineSound } from "react-icons/ai";
import { IoVolumeMute } from "react-icons/io5";


interface CustomVideoPlayerProps {
    url: string;
    videoId: string;
    onVideoPlay: (videoId: string) => void;
    onVideoPause: (videoId: string) => void;
    isVideoPlaying: string | null;
}

const CustomVideoPlayer = ({
    url,
    videoId,
    onVideoPlay,
    onVideoPause,
    isVideoPlaying,
}: CustomVideoPlayerProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);

    const togglePlay = () => {
        const video = videoRef.current;
        if (!video) return;

        if (video.paused) {
            video.play();
            setIsPlaying(true);
            onVideoPlay(videoId);
        } else {
            video.pause();
            setIsPlaying(false);
            onVideoPause(videoId);
        }
    };

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (isVideoPlaying && isVideoPlaying !== videoId && !video.paused) {
            video.pause();
            setIsPlaying(false);
        }
    }, [isVideoPlaying, videoId]);

    const toggleMute = () => {
        const video = videoRef.current;
        if (!video) return;

        video.muted = !video.muted;
        setIsMuted(video.muted);
    };

    return (
        <div className="relative w-full aspect-[9/16] bg-black">
            <video
                ref={videoRef}
                src={url}
                className="w-full h-full object-cover"
                muted={isMuted}
                playsInline
                preload="metadata"
                style={{ pointerEvents: "auto" }}
            />

            {/* Controls Overlay */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-4 bg-black/50 px-4 py-2  w-full items-center justify-center">
                <button
                    onClick={togglePlay}
                    className="text-white text-xs md:text-sm px-2 md:px-3 py-1 bg-black rounded hover:bg-green-500"
                >
                    {isPlaying ? (
                        <AiOutlinePauseCircle size={18} />
                    ) : (
                        <AiOutlinePlayCircle size={18} />
                    )}
                </button>
                <button
                    onClick={toggleMute}
                    className="text-white text-xs md:text-sm px-2 md:px-3 py-1 bg-black rounded hover:bg-yellow-400"
                >
                    {isMuted ? (
                        <IoVolumeMute size={18} />
                    ) : (
                        <AiOutlineSound size={18} />
                    )}
                </button>
            </div>
        </div>
    );
};

export default CustomVideoPlayer;
