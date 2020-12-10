const { app, ipcMain, BrowserWindow, BrowserView } = require('electron');
const markdown = require( "markdown" ).markdown;
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  const editorView = new BrowserView({
    webPreferences: {
      preload: path.join(__dirname, 'editor.js')
    }
  });
  mainWindow.addBrowserView(editorView)
  editorView.webContents.loadFile(path.join(__dirname, 'editor.html'));
  editorView.setBounds({ x: 10, y: 50, width: 380, height: 510 });
  editorView.webContents.openDevTools();

  const viewerView = new BrowserView({
    webPreferences: {
      preload: path.join(__dirname, 'viewer.js')
    }
  });
  mainWindow.addBrowserView(viewerView);
  viewerView.webContents.loadFile(path.join(__dirname, 'viewer.html'));
  viewerView.setBounds({ x: 410, y: 50, width: 380, height: 510 });
  viewerView.webContents.openDevTools();

  ipcMain.on('markdown-changed', (_event, text) => {
    const html = markdown.toHTML(text);
    viewerView.webContents.send('html-changed', html);
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
