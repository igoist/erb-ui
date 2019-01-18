import { ipcRenderer, screen, desktopCapturer, shell } from 'electron';
import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';


import * as React from 'react';


class Screenshot extends React.Component<any, any> {

  componentDidMount() {
    ipcRenderer.on('shortcut-capture', () => {
      // 获取屏幕数量
      // screen为electron的模块
      const displays = screen.getAllDisplays()
      console.log(displays);
      // 每个屏幕都截图一个
      // desktopCapturer.getSources可以一次获取所有桌面的截图
      // 但由于thumbnailSize不一样所以就采用了每个桌面尺寸都捕获一张
      const getDesktopCapturer = displays.map((display, i) => {
        return new Promise((resolve, reject) => {
          desktopCapturer.getSources({
            types: ['screen'],
            thumbnailSize: display.size
          }, (error, sources) => {
            // Object.keys(sources[i]).map((v, k) => console.log(v, k))
            console.log(sources[i].name);
            console.log(sources[i].display_id);
            if (sources[i].name === 'Screen 1') {
              const screenshotPath = path.join(os.tmpdir(), 'screenshot.png');

              fs.writeFile(screenshotPath, sources[i].thumbnail.toPNG(), (err) => {
                if (err) return console.log(err);
                shell.openExternal(`file://${ screenshotPath }`);

                console.log('succ');
              });
            }
            if (!error) {
              return resolve({
                display,
                thumbnail: sources[i].thumbnail.toDataURL()
              })
            }
            return reject(error)
          })
        })
      })
      Promise.all(getDesktopCapturer)
        .then(sources => {
          // 把数据传递到主进程
          console.log('ine', sources);
          ipcRenderer.send('shortcut-capture', sources)
        })
        .catch(error => console.log(error))
    })

  }

  render() {
    return (
      <div>Screenshot</div>
    );
  }
}

export default Screenshot;
