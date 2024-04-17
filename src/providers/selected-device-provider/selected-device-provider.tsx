import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useMediaDevices } from '../devices-provider/devices-context-provider';

interface SelectedDevicesContextType {
  audioInputDevice: MediaDeviceInfo | null;
  videoInputDevice: MediaDeviceInfo | null;
  audioOutputDevice: MediaDeviceInfo | null;
  selectingHandle: (device: MediaDeviceInfo) => void;
}

const Context = createContext<SelectedDevicesContextType | null>(null);

export const SelectedMediaDevicesProvider: React.FC<React.PropsWithChildren<any>> = ({
  children,
}) => {

  const [selectedAudioOutputDevice, setselectedAudioOutputDevice] = useState<MediaDeviceInfo | null>(null);
  const [selectedAdioInputDevice, setselectedAdioInputDevice] = useState<MediaDeviceInfo | null>(null);
  const [selectedVideoInputDevice, setselectedVideoInputDevice] = useState<MediaDeviceInfo | null>(null);
  const { audioOutputDevices, audioInputDevices, videoInputDevices } = useMediaDevices();

  const setSelectedByKindDevice = (device: MediaDeviceInfo) => {
    switch (device.kind) {
      case "audioinput":
        setselectedAdioInputDevice(device);
        break;
      case "audiooutput":
        setselectedAudioOutputDevice(device);
        break;
      case "videoinput":
        setselectedVideoInputDevice(device)
        break
    }
  }

  useEffect(() => {
    if (!selectedAudioOutputDevice) {
      const defaultOAudio = audioOutputDevices.find((x) => { return x.deviceId == "default" && x.kind == "audiooutput" });
      if (defaultOAudio) {
        setselectedAudioOutputDevice(defaultOAudio);
      }
    }
    if (!selectedAdioInputDevice) {
      const defaultIAudio = audioInputDevices.find((x) => { return x.deviceId == "default" && x.kind == "audioinput" });
      if (defaultIAudio) {
        setselectedAdioInputDevice(defaultIAudio);
      }
    }
    if (!selectedVideoInputDevice) {
      const defaultIVideo = videoInputDevices.find((x) => { return x.deviceId == "default" && x.kind == "videoinput" });
      if (defaultIVideo) {
        setselectedVideoInputDevice(defaultIVideo);
      } else {
        if (videoInputDevices.length > 0) {
          setselectedVideoInputDevice(videoInputDevices[0]);
        }
      }
    }
  }, [audioOutputDevices, audioInputDevices, videoInputDevices]);


  const value = useMemo(
    (): SelectedDevicesContextType => ({
      audioInputDevice: selectedAdioInputDevice,
      audioOutputDevice: selectedAudioOutputDevice,
      videoInputDevice: selectedVideoInputDevice,
      selectingHandle: setSelectedByKindDevice
    }),
    [selectedAdioInputDevice, selectedAudioOutputDevice, selectedVideoInputDevice]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useSelectedMediaDevices = (): SelectedDevicesContextType => {
  const context = useContext(Context);

  if (!context) {
    throw new Error('useSelectedMediaDevices must be used within SelectedMediaDevicesProvider');
  }

  return context;
};