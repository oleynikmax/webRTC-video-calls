import { useEffect, useState } from "react";
import { useMediaDevices } from "../../providers/devices-provider/devices-context-provider";
import { useSelectedMediaDevices } from "../../providers/selected-device-provider/selected-device-provider";
import Select from "react-dropdown-select";


const Setting: React.FC = () => {

    const { audioInputDevices, audioOutputDevices, videoInputDevices } = useMediaDevices();
    const { audioInputDevice, audioOutputDevice, videoInputDevice, selectingHandle } = useSelectedMediaDevices();


    const [audioSelected, setaudioSelected] = useState<MediaDeviceInfo[]>();
    const [videoSelected, setvideoSelected] = useState<MediaDeviceInfo[]>();

    useEffect(() => {
        console.log(audioSelected);
        if (audioSelected) {
            selectingHandle(audioSelected[0]);
        }
    }, [audioSelected])

    useEffect(() => {
        console.log(videoSelected);
        if (videoSelected) {
            selectingHandle(videoSelected[0]);
        }
    }, [videoSelected])
    return (
        <div>
            <div>Test Settings</div>
            <div>
                <p>Audio inputs</p>
                <Select options={audioInputDevices} values={audioInputDevice ? [audioInputDevice] : []} labelField="label"
                    valueField="deviceId" onChange={(val) => setaudioSelected(val)}
                ></Select >
            </div>
            <div>
                <p>Video inputs</p>
                <Select options={videoInputDevices} values={videoInputDevice ? [videoInputDevice] : []} labelField="label"
                    valueField="deviceId" onChange={(val) => setvideoSelected(val)}
                ></Select >
            </div>
        </div>

    );
}

export default Setting;