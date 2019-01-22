import { ipcRenderer, screen, desktopCapturer, shell } from 'electron';
import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';


import * as React from 'react';

let captureWin: Boolean = false;
const captureScreen = () => {
  if (captureWin) {
    return ;
  }
  let displays = screen.getAllDisplays();
  console.log(displays);

  // 每个屏幕都截图一个
  // desktopCapturer.getSources可以一次获取所有桌面的截图
  // 但由于thumbnailSize不一样所以就采用了每个桌面尺寸都捕获一张
  // const getDesktopCapturer = displays.map((display, i) => {
  //   return new Promise((resolve, reject) => {
  //     desktopCapturer.getSources({
  //       types: ['screen'],
  //       thumbnailSize: display.size
  //     }, (error, sources) => {
  //       // Object.keys(sources[i]).map((v, k) => console.log(v, k))
  //       console.log(sources[i]);
  //       console.log(sources[i].name);
  //       console.log(sources[i].display_id);

  //       // 保存并打开名为XX的文件
  //       if (sources[i].name === 'Screen 1' || sources[i].name === 'Screen 2') {
  //       //   const screenshotPath = path.join(os.tmpdir(), 'screenshot.png');

  //       //   fs.writeFile(screenshotPath, sources[i].thumbnail.toPNG(), (err) => {
  //       //     if (err) return console.log(err);
  //       //     shell.openExternal(`file://${ screenshotPath }`);

  //       //     console.log('succ');
  //       //   });
  //         if (!error) {
  //           return resolve({
  //             display,
  //             thumbnail: sources[i].thumbnail.toDataURL()
  //           })
  //         }
  //         return reject(error)
  //       }
  //     })
  //   })
  // });

  // Promise.all(getDesktopCapturer)
  //   .then(sources => {
  //     // 把数据传递到主进程
  //     console.log('ine', sources);
  //     ipcRenderer.send('shortcut-capture', sources);
  //   })
  //   .catch(error => console.log(error))
  const { bounds: { width, height }, scaleFactor } = screen.getPrimaryDisplay();

  const $canvas = document.getElementById('js-canvas');
  const $bg = document.getElementById('js-bg');

  console.time('capture');
  desktopCapturer.getSources({
    types: ['screen'],
    thumbnailSize: {
      width: width * scaleFactor,
      height: height * scaleFactor,
    }
  }, (error, sources) => {
    console.timeEnd('capture')
    let imgSrc = sources[0].thumbnail.toDataURL()

    // let capture = new CaptureRenderer($canvas, $bg, imgSrc, scaleFactor);
  })

};


class Screenshot extends React.Component<any, any> {

  componentDidMount() {
    ipcRenderer.on('shortcut-capture', () => {
      captureScreen();
    })

  }

  render() {
    return (
      <div onClick={ () => ipcRenderer.send('screen-capture') }>Screenshot</div>
    );
  }
}

export default Screenshot;
