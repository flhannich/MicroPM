const { Tray, Menu, ipcMain } = require('electron');

const path = require('path');

// let timer = '';
//
//   ipcMain.on('TOKEN', (event, data) => {
//     if(data !== null) {
//       timer = String(data);
//     } else {
//       timer = ''
//     }
//   });


class TrayGenerator {
  constructor(mainWindow, store) {
    this.tray = null;
    this.store = store;
    this.mainWindow = mainWindow;
  }
  getWindowPosition = () => {
    const windowBounds = this.mainWindow.getBounds();
    const trayBounds = this.tray.getBounds();
    const x = Math.round(trayBounds.x + trayBounds.width - (windowBounds.width));
    const y = Math.round(trayBounds.y + trayBounds.height);
    return { x, y };
  };

  showWindow = () => {
    const position = this.getWindowPosition();
    this.mainWindow.setPosition(position.x, position.y, false);
    this.mainWindow.show();
    this.mainWindow.setVisibleOnAllWorkspaces(true);
    this.mainWindow.focus();
    this.mainWindow.setVisibleOnAllWorkspaces(false);
  };

  toggleWindow = () => {
    if (this.mainWindow.isVisible()) {
      this.mainWindow.hide();
    } else {
      this.showWindow();
    }
  };

  rightClickMenu = () => {
    const menu = [
      {
        role: 'quit',
        accelerator: 'Command+Q'
      }
    ];
    this.tray.popUpContextMenu(Menu.buildFromTemplate(menu));
  }


  createTray = () => {
    this.tray = new Tray(path.join(__dirname, './../assets/logo/logo-tray.png'));
    this.tray.setIgnoreDoubleClickEvents(true);
    this.tray.setTitle('00:12'); // macOS only
    this.tray.on('click', this.toggleWindow);
    this.tray.on('right-click', this.rightClickMenu);
  };
}

module.exports = TrayGenerator;
