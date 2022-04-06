import useStyles from './styles';
import Button from '@mui/material/Button';
import React from 'react';

interface Props {
	pauseRecording: () => void,
	resumeRecording: () => void,
	stopCapture: () => void,
	startCapture: () => void,

}

const Controls = ({pauseRecording, resumeRecording, stopCapture, startCapture}: Props) => {

  const styles = useStyles();

  return (
	 <div className={styles.btnWrapper}>
		 <Button id='start' onClick={() => startCapture()} variant="outlined">
			 Start
		 </Button>
		 <Button id='pause' onClick={() => pauseRecording()} variant="outlined">
			 Pause
		 </Button>
		 <Button id='resume' onClick={() => resumeRecording()} variant="outlined">
			 Resume
		 </Button>
		 <Button id='stop' onClick={() => stopCapture()} variant="outlined">
			 Stop
		 </Button>
	 </div>
  );


};

export default Controls;