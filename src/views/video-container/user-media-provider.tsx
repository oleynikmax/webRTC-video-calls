import { useState, useEffect } from "react";

export const useUserMedia = () => {
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [error, setError] = useState(null);

    const getUserMedia = async () => {

        if (!stream) {
            if(navigator.mediaDevices.getUserMedia)
            navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((stream) => {
                setStream(stream);
            }).catch((error) => {
                setError(error);
            })
        }

    };

    const cancel = () => {
        if (stream) {
            stream.getVideoTracks().map(track => track.stop());
            stream.getAudioTracks().map(track => track.stop());
        };
    };

    useEffect(() => {
        getUserMedia();
    }, [stream, error]);
    return { stream, error };
};
