import React, { useRef, useState } from "react";
import { Play, Pause, Volume2 } from "lucide-react";

// Keep track of all players globally
let activeAudio = null;

export default function AudioPlayer({ src }) {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    const togglePlay = () => {
        if (!isPlaying) {
            // Stop any other active audio before playing this one
            if (activeAudio && activeAudio !== audioRef.current) {
                activeAudio.pause();
                activeAudio.currentTime = 0;
            }

            audioRef.current.play();
            activeAudio = audioRef.current;
            setIsPlaying(true);
        } else {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    const handleTimeUpdate = () => {
        const current = audioRef.current.currentTime;
        const duration = audioRef.current.duration;
        setProgress((current / duration) * 100);
    };

    return (
        <div className="w-full max-w-sm p-2 bg-black text-white rounded-md">
            {/* Audio element */}
            <audio
                ref={audioRef}
                src={src}
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
            />

            <div className="flex items-center space-x-3">
                {/* Play / Pause button */}
                <button
                    onClick={togglePlay}
                    className="w-10 h-10 flex items-center justify-center bg-red-600 hover:bg-red-500 rounded"
                >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>

                {/* Progress bar */}
                <div className="flex-1 h-2 bg-gray-700 rounded">
                    <div
                        className="h-2 bg-blue-500 rounded"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                {/* Volume icon */}
                <Volume2 size={20} />
            </div>
        </div>
    );
}
