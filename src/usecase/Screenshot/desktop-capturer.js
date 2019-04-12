const { getCurrentScreen } = require('./utils');
const { desktopCapturer } = require('electron');

const curScreen = getCurrentScreen();

function getScreen(callback) {
  this.callback = callback;

  document.body.style.opacity = '0';
  let oldCursor = document.body.style.cursor;
  document.body.style.cursor = 'none';

  this.handleStream = (stream) => {
    document.body.style.cursor = oldCursor;
    document.body.style.opacity = '1';

    let video = document.createElement('video');
    video.style.cssText = 'position:absolute;top:-10000px;left:-10000px;';

    let loaded = false;
    video.onloadedmetadata = () => {
      if (loaded) {
        return ;
      }
      loaded = true;
      video.play();

      let canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      let ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      if (this.callback) {
        this.callback(canvas.toDataURL('image/png'))
      }

      video.remove();
      try {
        // Important! stop the stream
        stream.getTracks()[0].stop();
      } catch (e) {
        console.log('stream.getTracks error: ', e);
      }
    }
    video.srcObject = stream;
    document.body.appendChild(video);
  }

  this.handleSuccess = (stream) => {
    this.handleStream(stream);
  }

  this.handleError = (err) => {
    console.log('destop-capture handleError: ', err);
  }

  if (require('os').platform() === 'win32') {
    desktopCapturer.getSources({
      types: ['screen'],
      thumbnailSize: { width: 1, height: 1 },
    }, (e, sources) => {
      let selectSource = sources.filter(source => source.display_id + '' === curScreen.id + '')[0];
      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: selectSource.id + '',
            minWidth: 1280,
            minHeight: 720,
            maxWidth: 8000,
            maxHeight: 8000,
          },
        },
      })
      .then(this.handleSuccess)
      .catch(this.handleError)
    })
  } else {
    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: `screen:${curScreen.id}`,
          minWidth: 1280,
          minHeight: 720,
          maxWidth: 8000,
          maxHeight: 8000,
        },
      },
    })
    .then(this.handleSuccess)
    .catch(this.handleError)
  }
}

exports.getScreenSources = ({ types = ['screen'] } = {}, callback) => {
  console.log('in desktop-cap.. types: ', types);
  getScreen(callback)
}
