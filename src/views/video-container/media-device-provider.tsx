import { useState, useEffect } from "react";

export const useMediaDevicesInfo = () => {

    const [mediaDevices, setMediaDevices] = useState<MediaDeviceInfo[]>([]);

    useEffect(() => {
        navigator.mediaDevices.enumerateDevices().then((devices) => {
            setMediaDevices(devices);
        }).catch((error) => {
            console.log(error);
        });
    }, []);
    return { mediaDevices };
};
