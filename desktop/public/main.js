const { app, BrowserWindow, ipcMain, Menu } = require('electron');
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
    width: 320,
    height: 420,
    show: false,
    frame: false,
    vibrancy: 'ultra-dark',
    fullscreenable: false,
    resizable: false,
    webPreferences: {
      devTools: is.development,
      nodeIntegration: false,
      enableRemoteModule: true,
      preload: __dirname + '/preload.js',
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
  // mainWindow.on ('blur', () => {
  //   mainWindow.hide ();
  // });
};

app.on('ready', () => {
  createMainWindow();
  Tray = new TrayGenerator(mainWindow, store);
  Tray.createTray();
  ipcMain.on('TOKEN', (event, data) => {
    store.set('token', data);
  });

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('INIT_TOKEN', store.get('token'));
    console.log(store.get('api'));
  });

});

app.setLoginItemSettings({
  openAtLogin: store.get('launchAtStart'),
});


app.dock.hide();

const template = [
  {
    label: app.name,
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      {
        label: 'Settings',
        click: openSettingsWindow
      },
      { type: 'separator' },
      {
        label: 'Launch at startup',
        type: 'checkbox',
        checked: store.get('launchAtStart'),
        click: event => store.set('launchAtStart', event.checked)
      },
      { role: 'services' },
      { type: 'separator' },
      {
        label: 'Logout',
        click: logout
      },
      { type: 'separator' },
      { role: 'quit' }
    ]
  },
  {
  label: "Edit",
    submenu: [
        { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
        { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
        { type: "separator" },
        { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
        { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
        { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
        { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'View Website',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal('https://electronjs.org')
        }
      }
    ]
  }
]

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);



function logout() {
  console.log('logout');
}

var settingsWindow = null;

function openSettingsWindow() {
  if (settingsWindow) {
    settingsWindow.focus()
    return
  }

  settingsWindow = new BrowserWindow({
    height: 350,
    resizable: false,
    width: 550,
    title: 'Settings',
    backgroundColor: '#242424',
    minimizable: false,
    fullscreenable: false,
    useContentSize: true,
    webPreferences: {
      devTools: is.development,
      nodeIntegration: false,
      enableRemoteModule: true,
      preload: __dirname + '/preload.js',
    }
  })


  if (is.development) {
    settingsWindow.loadURL('http://localhost:3000/settings');
  } else {
    settingsWindow.loadURL('file://' + __dirname + '/pages/settings.html')
  }

  settingsWindow.on('closed', function() {
    settingsWindow = null
  })
}

try {
  require('electron-reloader')(module)
} catch (_) {}