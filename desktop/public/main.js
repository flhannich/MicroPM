const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const { is } = require('electron-util');
const path = require('path');
const TrayGenerator = require('./utils/Tray');
const Store = require('electron-store');

let mainWindow;
let Tray = null


const schema = {
  launchAtStart: true
}
const store = new Store(schema);

const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    width: 350,
    height: 450,
    show: false,
    frame: false,
    vibrancy: 'dark',
    fullscreenable: false,
    resizable: false,
    webPreferences: {
      devTools: is.development,
      nodeIntegration: true,
    }
  });
  if (is.development) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
    mainWindow.loadURL('http://localhost:3000');
  } else {
    mainWindow.loadURL(`file://${path.join(__dirname, '../../build/index.html')}`);
  }
  // mainWindow.once('ready-to-show', () => mainWindow.show());
  // mainWindow.on('closed', () => {
  //     mainWindow = null;
  // });
  mainWindow.on ('blur', () => {
    mainWindow.hide ();
  });
};

app.on('ready', () => {
  createMainWindow();
  Tray = new TrayGenerator(mainWindow, store);
  Tray.createTray();
});

app.setLoginItemSettings({
  openAtLogin: store.get('launchAtStart'),
});


app.dock.hide();
