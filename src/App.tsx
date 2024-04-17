import React from 'react';
import logo from './logo.svg';
import './App.css';
import CameraPreview from './views/video-container/camera-preview';
import Setting from './views/settings/setting-view';
import { MediaDevicesProvider } from './providers/devices-provider/devices-context-provider';
import { SelectedMediaDevicesProvider } from './providers/selected-device-provider/selected-device-provider';

function App() {
  return (
    <div className="App">
      <MediaDevicesProvider>
        <SelectedMediaDevicesProvider>
          <CameraPreview></CameraPreview>
          <Setting></Setting>
        </SelectedMediaDevicesProvider>
      </MediaDevicesProvider>

    </div>
  );
}

export default App;
