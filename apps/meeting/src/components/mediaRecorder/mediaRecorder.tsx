import React, {useEffect, useState} from 'react';
import useMediaRecorder from '../../hooks/useMediaRecorder';
import './styles.css';
import {MenuItem, Select, SelectChangeEvent, Switch} from '@mui/material';
import NewWindow from 'react-new-window';
import Controls from '../controls/controls';
import Button from '@mui/material/Button';
import {useMediaDevices} from '../../hooks/useMediaDevices';

const MediaRecorder = () => {
  const [isCameraEnabled, setIsCameraEnabled] = useState<boolean>(false);
  const [isScreenEnabled, setIsScreenEnabled] = useState<boolean>(true);
  const [isNewWindowOpen, setIsNewWindowOpen] = useState<boolean>(false);
  const [selectedMicrophone, setSelectMicrophone] = useState<string>('');
  const [selectedCamera, setSelectedCamera] = useState<string>('');
  const [isRecording, setIsRecording] = useState(false);
  const {cameras, microphones} = useMediaDevices();

  const {
    canvasRef,
    videoElemRef,
    cameraElemRef,
    startElemRef,
    stopElemRef,
    startCapture,
    stopCapture,
    resumeRecording,
    pauseRecording,
  } = useMediaRecorder({isCameraEnabled, selectedMicrophone, selectedCamera, isScreenEnabled});

  const startRecording = () => {
    setIsRecording(true);
    startCapture();
  };
  const stopRecording = () => {
    setIsRecording(false);
    stopCapture();
  };

  useEffect(() => {
    if (microphones.length > 0) {
      setSelectMicrophone(microphones[0].deviceId);
    }

    if (cameras.length > 0) {
      setSelectedCamera(cameras[0].deviceId);
    }
  }, [microphones, cameras]);

  return (
	 <>
		 <div className="mediaRecorderWrapper">
			 <video id="display" ref={videoElemRef} className='videoElementDisplay' style={{visibility: 'hidden'}}
			        muted autoPlay/>
			 <video id="camera" ref={cameraElemRef} className={'videoElementCamera'} style={{visibility: 'hidden'}}
			        muted autoPlay/>
			 <div className='mediaRecorderContentWrapper'>
				 <div>
					 <canvas className='canvasVideoElement videoElement' id="videoCanvas" ref={canvasRef}/>
					 <div id="canvas">
						 <div id='videoInputText'/>
						 <div id="video">
							 <Switch
                  checked={isCameraEnabled}
                  onChange={() => setIsCameraEnabled(!isCameraEnabled)}
                  inputProps={{'aria-label': 'controlled'}}
							 />
							 <label htmlFor="camera">Enable camera</label>
							 <Switch
                  checked={isScreenEnabled}
                  onChange={() => setIsScreenEnabled(!isScreenEnabled)}
                  inputProps={{'aria-label': 'controlled'}}
							 />
							 <label htmlFor="screen">Enable screen</label>
						 </div>
						 <br/>
						 <div id="video-information"/>
						 <div id="chunk-information"/>
					 </div>
				 </div>
				 <div id="form" className='settingsForm'>
					 <div id="devices" className='settingsDevicesWrapper'>
						 <div id="mic" className='settingsDeviceWrapper'>
							 <label htmlFor='audioPicker-select' className='settingsLabel'>Microphone</label>
							 <Select
                  value={selectedMicrophone}
                  disabled={isRecording}
                  onChange={(event: SelectChangeEvent) => setSelectMicrophone(event.target.value)}
                  inputProps={{'aria-label': 'controlled'}}
							 >
								 {microphones.map((microphone) => (
                    <MenuItem key={microphone.deviceId} value={microphone.deviceId}>
                      {microphone.label}
                    </MenuItem>
								 ))}
							 </Select>
						 </div>
						 <div id="cam" className='settingsDeviceWrapper'>
							 <label htmlFor='cameraPicker-select' className='settingsLabel'>Camera</label>
							 <Select
                  value={selectedCamera}
                  disabled={isRecording}
                  onChange={(event) => setSelectedCamera(event.target.value)}
                  inputProps={{'aria-label': 'controlled'}}
							 >
								 {cameras.map((camera) => (
                    <MenuItem key={camera.deviceId} value={camera.deviceId}>
                      {camera.label}
                    </MenuItem>
								 ))}
							 </Select>
						 </div>
					 </div>
					 <div id="buttons" className='settingsButtons-wrapper'>
						 <Button id="start" ref={startElemRef} disabled={isRecording} onClick={startRecording} variant="contained"
						         size="large">Start
							 Recording
						 </Button>
						 <Button id="stop" ref={stopElemRef} disabled={!isRecording} onClick={stopRecording} variant="outlined"
						         color="error" size="large">Stop
							 Recording</Button>
						 <Button id="controls" variant="outlined" size="large"
						         onClick={() => setIsNewWindowOpen(!isNewWindowOpen)}>{isNewWindowOpen ? 'Close Controls' : 'Open Controls'}</Button>
						 {isNewWindowOpen ?
                <NewWindow
							 features={{width: 400, height: 50}}>
                  <Controls
								 startCapture={startRecording}
								 stopCapture={stopRecording}
								 resumeRecording={resumeRecording}
								 pauseRecording={pauseRecording}/>
                </NewWindow> : null}
					 </div>
				 </div>
			 </div>
		 </div>
	 </>
  );
};

export default MediaRecorder;

