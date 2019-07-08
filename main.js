// const electron = require('electron');
const { app, BrowserWindow, globalShortcut, ipcMain, clipboard, nativeImage } = require('electron');
const webpackConfig = require('./webpack/dev');

const Screenshot = require('./src/usecase/Screenshot/index.js');
const ColorPicker = require('./src/usecase/ColorPicker/index.js');

function createWindow () {
  // 创建浏览器窗口
  win = new BrowserWindow({
    width: 1440,
    height: 876,
    // file: './index.html'
  });

  // 然后加载应用的 index.html。
  // win.loadFile('./dist/index.html');
  win.loadURL(`http://localhost:${ webpackConfig.devServer.port }/index.html`);

  // 打开开发者工具
  win.webContents.openDevTools();

  globalShortcut.register('CmdOrCtrl+Y', () => {
    // Do stuff when Y and either Command/Control is pressed.
    console.log('CmdOrCtrl+Y');
  });
  globalShortcut.register('Ctrl+Y', () => {
    // Do stuff when Y and Ctrl is pressed.
    console.log('Ctrl+Y');
    win.webContents.send('mode-change', Math.random());
  });

  Screenshot.initPlugin();
  ColorPicker.initPlugin();
}

app.on('ready', createWindow)
