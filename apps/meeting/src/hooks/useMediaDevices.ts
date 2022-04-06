import {useEffect, useState, useMemo, useCallback} from 'react';

export interface Device {
	deviceId: string;
	label: string;
	kind: string;
}

export const useMediaDevices = () => {
	 const [devices, setDevices] = useState<Device[]>([]);

	 const microphones = useMemo(
    () => devices.filter((device) => device.kind === 'audioinput'),
    [devices]
	 );

	 const cameras = useMemo(
    () => devices.filter((device) => device.kind === 'videoinput'),
    [devices]
	 );

	 const setMediaDevices = useCallback(() => {
		 navigator.mediaDevices
      .enumerateDevices()
      .then((mediaDevices) => setDevices(mediaDevices));
	 }, []);

	 useEffect(() => {
    navigator.mediaDevices
			 .getUserMedia({
				 audio: true, video: {
					 facingMode: 'user',
				 },
			 }).then(() => {
        setMediaDevices();
      });
  }, []
	 );

	 return {
		 microphones,
		 cameras,
		 setMediaDevices,
	 };
};
