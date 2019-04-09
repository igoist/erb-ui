const { BrowserWindow, ipcMain, globalShortcut, remote } = require('electron');
const fs = require('fs');
const os = require('os');
const path = require('path');


let captureWins = [];

const closeWindows = () => {
  if (captureWins.length) {
    captureWins.forEach(win => win.close());
    captureWins = [];
    globalShortcut.unregister('Esc');
    console.log('captureWin is closed, and unreg kb');
  }
};


const captureScreen = (e, args) => {
  // console.log(args);
  if (captureWins.length) {
    if (args && args.type) {
      console.log(args.type);
      args.ex && console.log(args.ex);
      switch (args.type) {
        case 'cancel':
          closeWindows();
          break;
        case 'complete':
          captureWins.forEach(win => win.hide());
          console.log('xx complete(wins hide)');
          break;
        case 'save':
          captureWins.forEach(win => win.hide());
          fs.writeFile(args.path, new Buffer(args.url.replace('data:image/png;base64,', ''), 'base64'), () => {
            console.log('.. should be downloaded');
            closeWindows();
          });
          break;
        case 'select':
          captureWins.forEach(win => win.webContents.send('capture-screen', { type: 'select', screenId: args.screenId }));
          break;
        case 'hidden':
          captureWins.forEach(win => win.hide());
          break;
        case 'show':
          captureWins.forEach(win => win.show());
          break;
        default:
          break;
      }
    }
    return;
  }
  // !!!
  const { screen } = require('electron');

  let displays = screen.getAllDisplays();

  captureWins = displays.map((display) => {
    let captureWin = new BrowserWindow({
      // window 使用 fullscreen,  mac 设置为 undefined, 不可为 false
      fullscreen: os.platform() === 'win32' || undefined,
      width: display.bounds.width,
      height: display.bounds.height,
      x: display.bounds.x,
      y: display.bounds.y,
      transparent: true,
      frame: false,
      skipTaskbar: true,
      autoHideMenuBar: true,
      movable: false,
      resizable: true,
      enableLargerThanScreen: true,
      hasShadow: false,
    });
    captureWin.setAlwaysOnTop(true, 'screen-saver');
    captureWin.setVisibleOnAllWorkspaces(true);
    captureWin.setFullScreenable(false);

    captureWin.loadURL(`file://${ path.resolve(__dirname, '../') }/src/usecase/Screenshot/screenshot.html`);

    // captureWin.openDevTools()

    captureWin.on('closed', () => {
      console.log(`captureWindow xx is closing, and it should be released`);
      captureWin = null;
    });

    return captureWin;
  });

  globalShortcut.register('Esc', () => {
    closeWindows();
  });
};

const CaptureScreenInit = () => {
  globalShortcut.register('CmdOrCtrl+Shift+F', captureScreen);

  ipcMain.on('capture-screen', captureScreen);
}

exports.CaptureScreenInit = CaptureScreenInit;
exports.captureSceen = captureScreen;
