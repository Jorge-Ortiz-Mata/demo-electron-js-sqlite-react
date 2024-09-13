# ElectronJS with React

## Getting started from the beginning.

1. Create react app: `npx create-react-app myapp`
2. Install electron package: `npm install electron --save-dev`
3. Create the electron.js file on the root path

```js
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
```

4. Update the package.json file:

```json
{
  "homepage": "./",
  "main": "electron.js",
  "scripts": {
    "electron": "electron ."
  },
}
```

5. Build the react project and when the index.html file is ready on the /build folder, you might update the script path to: `./static/...`

6. To launch ElectronJS in development, make sure to have the react server running: `localhost:3000` and update the path on the electron.js file

7. To launch ElectronJS with index.html file, update the path on the electron.js file
