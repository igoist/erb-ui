import * as React from 'react';

import './style.css';

const V = 'video-player';

// let tmpSrc = '/videos/\[JyFanSub\]\[Shingeki\ no\ Kyojin\ 3\]\[13\]\[BIG5\]\[720p\]\[MP4\].mp4';
let tmpSrc = '/videos/13.mp4';
// let tmpSrc = '/videos/test.mp4';

const returnState = () => {
  return {
    src: tmpSrc
  };
};

interface HandleFn {
  (): void;
}

interface BindMoveConfig {
  el: any;
  handleMove: any;
  flag?: string;
}

const bindMove = (config: BindMoveConfig) => {
  const { el, handleMove, flag } = config;

  el.addEventListener('mousedown', (e: MouseEvent) => {
    if (!flag) {
      handleMove(e);
    }

    document.addEventListener('mousemove', handleMove);

    const mouseUp = (e: MouseEvent) => {
      document.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseup', mouseUp);
    };

    document.addEventListener('mouseup', mouseUp);
  });
};

const VideoPlayer = () => {
  const playerRef = React.useRef(null);

  const [state, setState] = React.useState(returnState());

  let handlePlay: (HandleFn | null) = null;
  let handlePause: (HandleFn | null) = null;
  let handleTimeDelta: ((m: number) => void | null) = null;

  React.useEffect(() => {
    const player = playerRef.current;
    // player.play();
    (window as any).p = player;

    handlePlay = () => {
      player.play();
    };

    handlePause = () => {
      player.pause();
    }

    handleTimeDelta = (m: number) => {
      player.currentTime += 0.1 * m;
    };



    // (async () => {
    //   try {
    //     return await player.play();
    //     // setTimeout(() => {
    //     //   this.media.pause();
    //     // }, 2000);
    //   } catch(err) {
    //     console.log(err);
    //   }
    // })();
  }, []);

  return (
    <div>
      <div className={ `${ V }-wrap` }>
        <div className={ `${ V }` }>
          {/* <img src='http://hbimg.huabanimg.com/2802ce09a67569b45436100175c602e93b138b5663f5e-HVswtK_fw658' /> */}
          <img src='/img/w1.png' />
          {/* <video src={ state.src } ref={ playerRef }></video> */}
          <video src='/Users/Egoist/Downloads/video/Sex.Education.S01E02.WEBRip.x264-STRiFE[rarbg]/sex.education.s01e02.webrip.x264-strife.mkv' ref={ playerRef }></video>
        </div>
      </div>
      <div className={ `${ V }-control-wrap`}>
        <div className={ `${ V }-control-btn-group` }>
          <div className={ `${ V }-control-btn ${ V }-control-btn01`} onClick={ () => handlePlay() }>Play</div>
          <div className={ `${ V }-control-btn ${ V }-control-btn02`} onClick={ () => handlePause() }>Pause</div>
        </div>
        <div className={ `${ V }-control-btn-group` }>
          <div className={ `${ V }-control-btn ${ V }-control-btn03`} onClick={ () => handleTimeDelta(1) }>+0.1s</div>
          <div className={ `${ V }-control-btn ${ V }-control-btn04`} onClick={ () => handleTimeDelta(10) }>+1.0s</div>
          <div className={ `${ V }-control-btn ${ V }-control-btn05`} onClick={ () => handleTimeDelta(100) }>+10.0s</div>
          <div className={ `${ V }-control-btn ${ V }-control-btn06`} onClick={ () => handleTimeDelta(1000) }>+100.0s</div>
        </div>
        <div className={ `${ V }-control-btn-group` }>
          <div className={ `${ V }-control-btn ${ V }-control-btn07`} onClick={ () => handleTimeDelta(-1) }>-0.1s</div>
          <div className={ `${ V }-control-btn ${ V }-control-btn08`} onClick={ () => handleTimeDelta(-10) }>-1.0s</div>
          <div className={ `${ V }-control-btn ${ V }-control-btn09`} onClick={ () => handleTimeDelta(-100) }>-10.0s</div>
          <div className={ `${ V }-control-btn ${ V }-control-btn10`} onClick={ () => handleTimeDelta(-1000) }>-100.0s</div>
        </div>
        <div className={ `${ V }-control-btn-group` }>

        </div>
      </div>
    </div>
  )
};

export default VideoPlayer;
