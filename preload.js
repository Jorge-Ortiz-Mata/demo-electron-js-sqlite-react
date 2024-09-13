const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Enviar para guardar el registro
  saveRecord: (data) => ipcRenderer.send('save-record', data),

  // Listener para recibir confirmación de guardado (registrar solo una vez)
  onRecordSaved: (callback) => ipcRenderer.once('record-saved', (event, response) => callback(response)),

  // Obtener todos los registros
  getRecords: () => ipcRenderer.send('get-all-records'),

  // Listener para recibir los registros (registrar solo una vez)
  onRecordsReceived: (callback) => ipcRenderer.once('get-all-records', (event, response) => callback(response)),

  // Remover todos los listeners (cuando sea necesario)
  removeSaveRecordListeners: () => ipcRenderer.removeAllListeners('record-saved'),
  removeGetRecordsListeners: () => ipcRenderer.removeAllListeners('get-all-records'),
});
