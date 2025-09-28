"use client";

import React, { useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { MessageCircle } from "lucide-react";
import HeadText from "./Head-Text";
import CustomVideoPlayer from "../CustomVideoPlayer";

const testimonials = [
    { name: "Ravi Sharma", videoUrl: "https://pub-a3d2b35862c1483894ffbee942bb995e.r2.dev/Untitled%20design.mp4" },
    { name: "Anita Verma", videoUrl: "https://pub-a3d2b35862c1483894ffbee942bb995e.r2.dev/Untitled%20design.mp4" },
    { name: "Karan Singh", videoUrl: "https://pub-a3d2b35862c1483894ffbee942bb995e.r2.dev/Untitled%20design.mp4" },
    { name: "Priya Mehta", videoUrl: "https://pub-a3d2b35862c1483894ffbee942bb995e.r2.dev/Untitled%20design.mp4" },
    { name: "Deepak Rao", videoUrl: "https://pub-a3d2b35862c1483894ffbee942bb995e.r2.dev/Untitled%20design.mp4" },
    { name: "Sunita Jain", videoUrl: "https://pub-a3d2b35862c1483894ffbee942bb995e.r2.dev/Untitled%20design.mp4" },
    { name: "Rajeev Kapoor", videoUrl: "https://pub-a3d2b35862c1483894ffbee942bb995e.r2.dev/Untitled%20design.mp4" },
    { name: "Meena Gupta", videoUrl: "https://pub-a3d2b35862c1483894ffbee942bb995e.r2.dev/Untitled%20design.mp4" },
];

const Testimonials = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "start",
        skipSnaps: false,
    });

    const [isVideoPlaying, setIsVideoPlaying] = useState<string | null>(null);

    const autoScrollInterval = useRef<NodeJS.Timeout | null>(null);


    useEffect(() => {
        if (!emblaApi) return;

        const stopAutoScroll = () => {
            if (autoScrollInterval.current) {
                clearInterval(autoScrollInterval.current);
                autoScrollInterval.current = null;
            }
        };


        if (isVideoPlaying) {
            stopAutoScroll();
        } else {

            autoScrollInterval.current = setInterval(() => {
                emblaApi.scrollNext();
            }, 2500);
        }

        return stopAutoScroll;
    }, [emblaApi, isVideoPlaying]);

    const handleVideoPlay = (videoId: string) => {
        setIsVideoPlaying(videoId);
    };

    const handleVideoPause = (videoId: string) => {
        if (isVideoPlaying === videoId) {
            setIsVideoPlaying(null);
        }
    };

    return (
        <section className="bg-white text-black py-12 px-4 sm:px-6 relative">
            <div className="max-w-7xl mx-auto">
                <HeadText
                    icon={<MessageCircle size={18} />}
                    icontitle="What Our Clients Say"
                    title="Testimonials & Experiences"
                    description="Real stories from real clients. Here's what they have to say about working with us."
                />


                <div className="relative overflow-hidden" ref={emblaRef}>
                    <div className="flex">
                        {testimonials.map((t, idx) => (
                            <div key={idx} className="flex-none basis-1/2 sm:basis-1/4 md:basis-1/5 px-1 md:px-2 ">
                                <div className="border border-gray-200 hover:border-black bg-gray-50 p-2 flex flex-col rounded overflow-hidden">
                                    <div className="aspect-[9/16] bg-black relative overflow-hidden">
                                        <CustomVideoPlayer
                                            url={t.videoUrl}
                                            videoId={t.name}
                                            onVideoPlay={handleVideoPlay}
                                            onVideoPause={handleVideoPause}
                                            isVideoPlaying={isVideoPlaying}
                                        />
                                    </div>
                                    <div className="mt-2 text-center">
                                        <h3 className="text-sm font-semibold text-black">{t.name}</h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


            </div>
        </section>
    );
};

export default Testimonials;
