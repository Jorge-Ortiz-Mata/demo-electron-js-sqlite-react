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

## Build App

1. Move the following files under the public folder:
  - electron.js
  - /database
  - preload.js

2. Install the electron-builder package: 

```json
"devDependencies": {
  "electron": "^32.1.0",
  "electron-builder": "^25.0.5", // <------ This one
  "tailwindcss": "^3.4.11"
}
```

3. Update the package.json file by adding the build section and the scripts:

```json
"main": "public/electron.js",
"description": "Demo Electron React SQLite App",
"author": "Jorge Ortiz",
"build": {
  "appId": "com.demo-electron-react-sqlite.app"
},
"scripts": {
  "electron": "electron .",
  "dev": "yarn build && yarn electron",
  "prd": "yarn build && yarn electron-builder"
},
```

4. If you are using SQLit, update the path name of the database

5. Build and launch your app: `yarn prd`
