// const electron = require('electron');
const { app, BrowserWindow, globalShortcut, ipcMain, clipboard, nativeImage } = require('electron');
const webpackConfig = require('./webpack/dev');


// 保证函数只执行一次
let isRan = false;
// 截图时会出现截图界面，如下就是保存截图窗口的数组
const $windows = [];
// 判断是否为快捷键退出，其他的退出方式都不被允许
let isClose = false;


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

  globalShortcut.register('CmdOrCtrl+Shift+a', function () {
    win.webContents.send('shortcut-capture');
    console.log('CmdOrCtrl+Shift+a');
  });
  globalShortcut.register('CmdOrCtrl+Shift+x', function () {
    closeWindow();
  });

  ipcMain.on('shortcut-capture', (e, sources) => {
    // 如果有以前的窗口就关闭以前的窗口
    // 然后根据截图资源于屏幕数据生成窗口
    closeWindow();
    sources.forEach(source => {
      createWindow2(source);
      // console.log(typeof source);
      // Object.keys(source).map(v => {
      //   console.log(v);
      // })
    });
  });

  ipcMain.on('cancel-shortcut-capture', closeWindow);

  ipcMain.on('set-shortcut-capture', (e, dataURL) => {
    clipboard.writeImage(nativeImage.createFromDataURL(dataURL));
    closeWindow();
  });
}

app.on('ready', createWindow)

function createWindow2 (source) {
  // display为屏幕相关信息
  // 特别再多屏幕的时候要定位各个窗口到对应的屏幕
  const { display } = source;
  const $win = new BrowserWindow({
    title: '截图',
    width: display.size.width,
    height: display.size.height,
    x: display.bounds.x,
    y: display.bounds.y,
    frame: false,
    show: false,
    transparent: true,
    resizable: true,
    alwaysOnTop: true,
    // fullscreen: true,
    skipTaskbar: true,
    closable: true,
    minimizable: false,
    maximizable: false
  })
  // 全屏窗口
  // setFullScreen($win, display);
  // 只能通过cancel-shortcut-capture的方式关闭窗口
  $win.on('close', e => {
    if (!isClose) {
      e.preventDefault()
      console.log('close');
    }
  });
  // 页面初始化完成之后再显示窗口
  // 并检测是否有版本更新
  $win.once('ready-to-show', () => {
    $win.show()
    $win.focus()
    // 重新调整窗口位置和大小
    // setFullScreen($win, display)
  })

  // 当页面加载完成时通知截图窗口开始程序的执行
  $win.webContents.on('dom-ready', () => {
    $win.webContents.executeJavaScript(`window.source = ${JSON.stringify(source)}`);
    setTimeout(() => {
      $win.webContents.send('dom-ready')
      $win.focus()
    }, 500);
  })
  // 加载地址
  $win.loadURL(`file://${__dirname}/src/usecase/Screenshot/screenshot.html`)
  // $win.webContents.openDevTools();
  $windows.push($win);
}

function setFullScreen ($win, display) {
  $win.setBounds({
    width: display.size.width,
    height: display.size.height,
    x: display.bounds.x,
    y: display.bounds.y
  })
  $win.setAlwaysOnTop(true)
  $win.setFullScreen(true)
}

// 关闭窗口
function closeWindow () {
  isClose = true
  while ($windows.length) {
    const $winItem = $windows.pop()
    $winItem.close()
  }
  isClose = false
}
