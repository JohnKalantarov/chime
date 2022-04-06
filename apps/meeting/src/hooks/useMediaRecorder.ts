import {Ref, RefObject, useEffect, useRef, useState} from 'react';
// import {useVideoContext} from '../providers/RecordedVideoProvider';
// import {useNavigate} from 'react-router-dom';

interface Props {
	isCameraEnabled: boolean,
	selectedCamera: string,
	selectedMicrophone: string,
	isScreenEnabled: boolean
}

const useMediaRecorder = ({isCameraEnabled, selectedCamera, selectedMicrophone, isScreenEnabled}: Props) => {
  const videoElemRef: Ref<HTMLVideoElement> | undefined = useRef<HTMLVideoElement>(null);
  const cameraElemRef: Ref<HTMLVideoElement> | undefined = useRef<HTMLVideoElement>(null);
  const startElemRef: RefObject<HTMLButtonElement> | null | undefined = useRef<HTMLButtonElement>(null);
  const stopElemRef: RefObject<HTMLButtonElement> | null | undefined = useRef<HTMLButtonElement>(null);
  const canvasRef: Ref<HTMLCanvasElement> = useRef<HTMLCanvasElement>(null);
  const [videoMediaRecorder, setVideoMediaRecorder] = useState<MediaRecorder | null>(null);
  const [cameraMediaRecorder, setCameraMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordedBlobsVideo, setRecordedBlobsVideo] = useState<Array<Blob>>([]);
  const [recordedBlobsCamera, setRecordedBlobsCamera] = useState<Array<Blob>>([]);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [videoElem, setVideoElem] = useState<HTMLVideoElement | null>(null);
  const [cameraElem, setCameraElem] = useState<HTMLVideoElement | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [faceMode, setFaceMode] = useState('environment');
  // const {setRecordedScreenVideo, setRecordedCameraVideo} = useVideoContext();
  // const navigate = useNavigate();

  let screenX0 = 0;
  let screenY0 = 0;
  let screenX1: number | undefined = context?.canvas?.width;
  let screenY1: number | undefined = context?.canvas?.height;

  const cameraX0 = 0;
  const cameraY0 = 0;
  const cameraX1 = 0;
  const cameraY1 = 0;

  const cameraW = 739;
  const cameraH = 415;
  const cameraFR = 30;

  let screenShared = false;

  useEffect(() => {
    const canvas: HTMLCanvasElement = canvasRef.current!;

    const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
    setContext(context);

    const videoElem: HTMLVideoElement | null = videoElemRef.current;
    setVideoElem(videoElem);

    const cameraElem: HTMLVideoElement | null = cameraElemRef.current;
    setCameraElem(cameraElem);

    if (context) {
      screenShared = false;
      context.canvas.width = 739;
      context.canvas.height = 415;
      context.font = '60px Arial';
      context.fillStyle = 'red';
      context.textAlign = 'center';
      if (context && context.canvas) {
        screenX0 = 0;
        screenY0 = 0;
        screenX1 = context.canvas.width;
        screenY1 = context.canvas.height;
      }
    }

    setFaceMode(!isScreenEnabled ? 'user' : 'environment');

    if (videoElem && cameraElem && context && canvas) {
      createStream(videoElem, cameraElem, context, canvas);
    }
  }, [isCameraEnabled, isScreenEnabled]);

  useEffect(() => {
    const getMediaStream = async () => {
      if (isCameraEnabled) {
        const mediaStream: MediaStream = await navigator.mediaDevices
				 .getUserMedia({
					 audio: true,
					 video: {
						 facingMode: 'user',
						 width: {min: 100, ideal: cameraW, max: 1920},
						 height: {min: 100, ideal: cameraH, max: 1080},
						 frameRate: {ideal: cameraFR},
						 deviceId: selectedCamera,
					 },
				 });
				cameraElem!.srcObject = mediaStream;
      } else {
        await navigator.mediaDevices
				 .getUserMedia({
					 audio: true, video: {
						 facingMode: 'user',
					 },
				 });
				cameraElem!.srcObject = null;
      }
    };
    getMediaStream();
  }, [isCameraEnabled, selectedCamera]);

  const drawCanvas = (screenIn: HTMLVideoElement, cameraIn: HTMLVideoElement, canvas: CanvasRenderingContext2D) => {
    canvas?.drawImage(screenIn, screenX0, screenY0, screenX1!, screenY1!);
    canvas?.drawImage(cameraIn, cameraX0, cameraY0, cameraX1, cameraY1);
    setTimeout(drawCanvas, 1, screenIn, cameraIn, canvas);
  };

  const createStream = (videoElem: HTMLVideoElement, cameraElem: HTMLVideoElement, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    canvas?.captureStream(35);
    drawCanvas(videoElem, cameraElem, context);
    videoElem.addEventListener('play', () => {
      drawCanvas(videoElem, cameraElem, context);
    });
  };

  useEffect(() => {
    const enterCameraElementPictureInPicture = async () => {
      if (cameraElem) {
        cameraElem.onloadedmetadata = async () => {
          if (
					 cameraElem &&
					 cameraElem.srcObject &&
					 isCameraEnabled
          ) {
            await enterPictureInPicture(cameraElem);
          }
        };
      }
      if (!isCameraEnabled && document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      }
    };
    enterCameraElementPictureInPicture();
  }, [isCameraEnabled]);

  const enterPictureInPicture = async (cameraElem: HTMLVideoElement) => {
    if (
		 document.pictureInPictureEnabled &&
		 !cameraElem.disablePictureInPicture
    ) {
      try {
        if (document.pictureInPictureElement) {
          await (document as DocumentPictureInPicture).exitPictureInPicture();
        }

        await cameraElem.requestPictureInPicture();
      } catch (err: unknown) {
        console.error(err);
      }
    }
  };

  const startCapture = async () => {
    try {
      const displayMediaOptions = {
        video: {
          frameRate: {ideal: cameraFR},
          mimeType: 'video/mp4; codecs=h264',
        },
        audio: true,
      };

      const rearCameraMediaOptions = {
        audio: false,
        video: {
          facingMode: faceMode,
          width: {min: 100, ideal: cameraW, max: 1920},
          height: {min: 100, ideal: cameraH, max: 1080},
          deviceId: selectedCamera,
          mimeType: 'video/mp4; codecs=h264',
        },
      };

      if (!screenShared) {
        if (isScreenEnabled) {
					videoElem!.srcObject = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
					screenShared = true;
        } else {
					videoElem!.srcObject = await navigator.mediaDevices.getUserMedia(rearCameraMediaOptions);
					screenShared = true;
        }
      }

      const audioStreamOptions = {
        // mimeType: "video/webm;codecs=vp8,opus",
        mimeType: 'video/mp4; codecs=h264',
        audio: {
          deviceId: selectedMicrophone,
        },
      };

      const audioStream = await navigator.mediaDevices.getUserMedia(audioStreamOptions);

      for (const track of audioStream.getTracks()) {
        if (isScreenEnabled) {
          const screenMediaStream: MediaStream = videoElem!.srcObject as MediaStream;
          screenMediaStream.addTrack(track);
        }

        if (isCameraEnabled) {
          const cameraMediaStream: MediaStream = videoElem!.srcObject as MediaStream;
          cameraMediaStream.addTrack(track);
        }
      }
      if (isScreenEnabled) {
        startRecording();
      }

      if (isCameraEnabled) {
        startCameraRecording();
      }

      if (isScreenEnabled || isCameraEnabled) {
        setIsRecording(true);
      }
    } catch (err: unknown) {
      console.error('Error: ' + err);
    }
  };

  const createMediaRecorder = (mediaRecorderStream: MediaStream | null) => {
    let localMediaRecorder;
    try {
      localMediaRecorder = new MediaRecorder(mediaRecorderStream!, {
        audioBitsPerSecond: 128000,
        videoBitsPerSecond: 4000000,
        //mimeType: 'video/mp4'
      });
    } catch (error: any) {
      alert(error.message);
      return;
    }

    localMediaRecorder.start(1000);

    return localMediaRecorder;
  };

  const startRecording = () => {
    const videoRecorder: MediaRecorder | undefined = createMediaRecorder(videoElem!.srcObject as MediaStream);
    const videoLocalRecorderedBlobs: Array<Blob> = [];
    if (videoRecorder) {
      setVideoMediaRecorder(videoRecorder);
      videoRecorder.ondataavailable = (ev: BlobEvent) => {
        videoLocalRecorderedBlobs.push(ev.data);
      };
      setRecordedBlobsVideo(videoLocalRecorderedBlobs);
    }
  };

  const startCameraRecording = () => {
    const cameraRecorder: MediaRecorder | undefined = createMediaRecorder(cameraElem!.srcObject as MediaStream);
    const cameraLocalRecorderedBlobs: Array<Blob> = [];
    if (cameraRecorder) {
      setCameraMediaRecorder(cameraRecorder);
      cameraRecorder.ondataavailable = (ev) => {
        cameraLocalRecorderedBlobs.push(ev.data);
      };
      setRecordedBlobsCamera(cameraLocalRecorderedBlobs);
    }
  };

  const resumeRecording = () => {
		videoMediaRecorder!.resume();
		if (isCameraEnabled) {
			cameraMediaRecorder!.resume();
		}
		setIsRecording(true);
  };

  const pauseRecording = () => {
		videoMediaRecorder!.pause();
		if (isCameraEnabled) {
			cameraMediaRecorder!.pause();
		}
		setIsRecording(false);
  };

  const stopCapture = () => {
    if (isRecording) {
			document.getElementById('videoInputText')!.innerHTML = '';
			if (isScreenEnabled) {
			  const tracks = (videoElem!.srcObject as MediaStream).getTracks();
			  tracks.forEach(track => track.stop());
			  screenShared = true;
			}

			if (isCameraEnabled) {
			  const cameraTracks = (cameraElem!.srcObject as MediaStream).getTracks();
			  cameraTracks.forEach(cameraTracks => cameraTracks.stop());
				cameraElem!.srcObject = null;
			}
			stopRecording();
    }
  };

  const stopRecording = () => {
    if (isScreenEnabled) {
			videoMediaRecorder!.stop();
			screenDownload(recordedBlobsVideo);
    }

    if (isCameraEnabled) {
			cameraMediaRecorder!.stop();
			cameraDownload(recordedBlobsCamera);
			(document as DocumentPictureInPicture).exitPictureInPicture();
    }
    setIsRecording(false);
  };

  const downloadBlob = (blob: Blob | MediaSource, type: string) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `${new Date().toISOString()}-${type}.mp4`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 100);
  };

  const cameraDownload = (blobs: BlobPart[] | undefined) => {
    const blob = new Blob(blobs, {type: 'video/mp4; codecs=h264'});
    // setRecordedCameraVideo(blob);
    downloadBlob(blob, 'camera');
  };

  const screenDownload = (blobs: BlobPart[] | undefined) => {
    const blob = new Blob(blobs, {type: 'video/mp4; codecs=h264'});
    // setRecordedScreenVideo(blob);
    downloadBlob(blob, 'screen');
  };

  return {
    canvasRef: canvasRef,
    videoElemRef: videoElemRef,
    startElemRef: startElemRef,
    cameraElemRef: cameraElemRef,
    stopElemRef: stopElemRef,
    startCapture: startCapture,
    stopCapture: stopCapture,
    resumeRecording: resumeRecording,
    pauseRecording: pauseRecording,
  };
};

export default useMediaRecorder;