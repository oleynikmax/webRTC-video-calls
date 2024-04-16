import { useEffect, useState } from "react";
import { useMediaDevicesInfo } from "../video-container/media-device-provider";


const Setting: React.FC = () => {

    const { mediaDevices } = useMediaDevicesInfo();

    const [videoInputs, setVideoInputs] = useState<MediaDeviceInfo[]>([]);
    const [audioInputs, setAudioInputs] = useState<MediaDeviceInfo[]>([]);
    useEffect(() => {
        if (mediaDevices) {
            const audio: MediaDeviceInfo[] = [];
            const video: MediaDeviceInfo[] = [];
            mediaDevices.forEach((x) => {
                if (x.kind == "audioinput") {
                    audio.push(x);
                }
                if (x.kind == "videoinput") {
                    video.push(x);
                }
            })
            setAudioInputs(audio);
            setVideoInputs(video);
        }
    }, [mediaDevices])
    return (
        <div>
            <div>Test Settings</div>
            <div>
                <p>Audio inputs</p>
                {audioInputs.map((audioDevice) => {
                    return (
                        <div style={{display:"flex"}}>
                            <div>{audioDevice.deviceId}</div>
                            <div>{audioDevice.label}</div>
                        </div>
                    );
                })}
            </div>
            <div>
                <p>Video inputs</p>
                {videoInputs.map((videoDevice) => {
                    return (
                        <div style={{display:"flex"}}>
                            <div>{videoDevice.deviceId}</div>
                            <div>{videoDevice.label}</div>
                        </div>
                    );
                })}
            </div>
        </div>

    );
}

export default Setting;