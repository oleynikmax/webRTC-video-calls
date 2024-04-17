import { createRef, useEffect, useRef, useState } from "react";
import { useUserMedia } from "./user-media-provider";


const CameraPreview: React.FC = () => {

    const { stream, error } = useUserMedia();
    const videoRef = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        if (error) {
            console.log(error);
            return;
        };
        if (stream && videoRef.current) {
            videoRef.current.srcObject = stream;
        }
        return;
    }, [stream, error]);

    return (
        <div className="local-video-container">
            <p>Video preview</p>
            <video ref={videoRef} className="local-video" autoPlay={true}></video>
        </div>
    );
}

export default CameraPreview