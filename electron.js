const path = require('path');
const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    }
  });

  win.loadURL("http://localhost:3000"); // DEV
  // win.loadURL(`file://${path.join(__dirname, '/build/index.html')}`); // PRD
}

app.whenReady().then(createWindow);
