import { useState, useEffect, useCallback } from "react";
import { useSelectedMediaDevices } from "../../providers/selected-device-provider/selected-device-provider";

export const useUserMedia = () => {
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [error, setError] = useState(null);
    const { audioInputDevice, videoInputDevice } = useSelectedMediaDevices();

    const getUserMedia = async () => {

        if (navigator.mediaDevices.getUserMedia)
            navigator.mediaDevices.getUserMedia({
                audio: {
                    deviceId: audioInputDevice?.deviceId,
                },
                video: {
                    deviceId: videoInputDevice?.deviceId,
                    frameRate: 60,

                }
            }).then((stream) => {
                setStream(stream);
            }).catch((error) => {
                setError(error);
            })


    };

    const cancel = () => {
        if (stream) {
            stream.getVideoTracks().map(track => track.stop());
            stream.getAudioTracks().map(track => track.stop());
        };
    };

    useCallback(() => {
        if (!stream) {
            getUserMedia();
        }
    }, [stream]);

    useEffect(() => {
        getUserMedia();

    }, [videoInputDevice, audioInputDevice]);

    return { stream, error };
};
