import React from 'react';
import logo from './logo.svg';
import './App.css';
import CameraPreview from './views/video-container/camera-preview';
import Setting from './views/settings/setting-view';

function App() {
  return (
    <div className="App">
      <CameraPreview></CameraPreview>
      <Setting></Setting>
    </div>
  );
}

export default App;
