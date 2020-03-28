import * as React from 'react';

declare var faceapi: any;

const FaceDetection = () => {
  let mediaStream = null;

  const videoRef: any = React.createRef();
  React.useEffect(() => {
    const video = videoRef.current; //document.getElementById('video');

    const handleStream = (stream: any) => {
      mediaStream = stream;

      console.log('this: ', this);

      mediaStream.stop = function () {
        this.getAudioTracks().forEach(function (track) {
            track.stop();
        });
        this.getVideoTracks().forEach(function (track) { //in case... :)
            track.stop();
        });
      };

      mediaStream.start = function () {
        this.getAudioTracks().forEach(function (track) {
            track.start();
        });
        this.getVideoTracks().forEach(function (track) { //in case... :)
            track.start();
        });
      };

      return (video as any).srcObject = stream;
    };

    const startVideo = () => {
      navigator.getUserMedia({ video: {} }, handleStream, err => console.error(err))
    };

    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
      faceapi.nets.faceExpressionNet.loadFromUri('/models'),
    ]).then(startVideo);


    video.addEventListener('play', () => {
      const canvas = faceapi.createCanvasFromMedia(video);
      document.body.appendChild(canvas);

      const displayDize = { width: (video as any).width, height: (video as any).height };

      faceapi.matchDimensions(canvas, displayDize);

      setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();

        console.log(detections);

        const resizeDetections = faceapi.resizeResults(detections, displayDize);

        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

        faceapi.draw.drawDetections(canvas, resizeDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizeDetections);
      }, 100);

    });
  }, []);

  const handleClick = () => {
    mediaStream.stop();
  }

  const handleStart = () => {
    const video = videoRef.current;

    const handleStream = (stream: any) => {
      mediaStream = stream;

      console.log('this: ', this);

      mediaStream.stop = function () {
        this.getAudioTracks().forEach(function (track) {
            track.stop();
        });
        this.getVideoTracks().forEach(function (track) { //in case... :)
            track.stop();
        });
      };

      mediaStream.start = function () {
        this.getAudioTracks().forEach(function (track) {
            track.start();
        });
        this.getVideoTracks().forEach(function (track) { //in case... :)
            track.start();
        });
      };

      return (video as any).srcObject = stream;
    };

    navigator.getUserMedia({ video: {} }, handleStream, err => console.error(err))
  }

  return (
    <div>
      <video id='video' width='720' height='560' autoPlay muted ref={videoRef}></video>
      <button onClick={ handleClick }>Stop</button>
      <button onClick={ handleStart }>Start</button>
    </div>
  );
};

export default FaceDetection;
