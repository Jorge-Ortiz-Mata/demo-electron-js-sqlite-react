const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  saveRecord: (data) => ipcRenderer.send('save-record', data),
  recordSaved: (callback) => ipcRenderer.on('record-saved', (event, response) => callback(response)),
});
