const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');
const { initializeDatabase } = require("./database/index");
const { getAllRecords, saveRecord } =require("./database/records");

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, './preload.js'),
      nodeIntegration: true,
      contextIsolation: true,
      enableRemoteModule: true,
    }
  });

  win.loadURL(`file://${path.join(__dirname, "../build/index.html")}`);
  win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

initializeDatabase();

ipcMain.on('save-record', (event, data) => {
  saveRecord(data, (err, savedRecord) => {
    if (err) {
      console.error('Error saving record:', err.message);
      event.reply('record-saved', { success: false, error: err.message });
    } else {
      console.log('Record saved:', savedRecord);
      event.reply('record-saved', { success: true, record: savedRecord });
    }
  });
});

ipcMain.on('get-all-records', (event, data) => {
  getAllRecords((err, records) => {
    if (err) {
      event.reply('get-all-records', { success: false, error: err.message });
    } else {
      event.reply('get-all-records', { success: true, records });
    }
  });
});
