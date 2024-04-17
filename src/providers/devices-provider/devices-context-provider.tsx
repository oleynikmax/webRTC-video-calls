import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

interface DevicesContextType {
  audioInputDevices: MediaDeviceInfo[];
  videoInputDevices: MediaDeviceInfo[];
  audioOutputDevices: MediaDeviceInfo[];
}

const Context = createContext<DevicesContextType | null>(null);

export const MediaDevicesProvider: React.FC<React.PropsWithChildren<any>> = ({
  children,
}) => {

  const [audioOutputDevices, setaudioOutputDevices] = useState<MediaDeviceInfo[]>([]);
  const [audioInputDevices, setaudioInputDevices] = useState<MediaDeviceInfo[]>([]);
  const [videoInputDevices, setvideoInputDevices] = useState<MediaDeviceInfo[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const setByKindDevices = (devices: MediaDeviceInfo[]) => {
    const inAudio: MediaDeviceInfo[] = [];
    const inVideo: MediaDeviceInfo[] = [];
    const outAudio: MediaDeviceInfo[] = [];
    devices.forEach((device) => {
      switch (device.kind) {
        case "audioinput":
          inAudio.push(device);
          break;
        case "audiooutput":
          outAudio.push(device);
          break;
        case "videoinput":
          inVideo.push(device)
          break
      }
      setaudioInputDevices(inAudio);
      setaudioOutputDevices(outAudio);
      setvideoInputDevices(inVideo);
    })
  }

  useEffect(() => {
    if (isLoaded)
      return;

    navigator.mediaDevices.enumerateDevices().then((devices) => {
      console.log(devices);
      setByKindDevices(devices);
    }).catch((error) => {
      console.log(error);
    });

  }, [isLoaded]);


  const value = useMemo(
    (): DevicesContextType => ({
      audioInputDevices: audioInputDevices,
      videoInputDevices: videoInputDevices,
      audioOutputDevices: audioOutputDevices
    }),
    [audioInputDevices, videoInputDevices, audioOutputDevices]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useMediaDevices = (): DevicesContextType => {
  const context = useContext(Context);

  if (!context) {
    throw new Error('udeMediaDevices must be used within MediaDevicesProvider');
  }

  return context;
};