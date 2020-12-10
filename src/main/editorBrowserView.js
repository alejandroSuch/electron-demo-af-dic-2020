const { BrowserView } = require('electron');
const path = require('path');

const addTo = browserWindow => {

  const editorView = new BrowserView({
    webPreferences: {
      preload: path.join(__dirname, '..', 'render', 'editor', 'editor.js')
    }
  });
  browserWindow.addBrowserView(editorView)
  editorView.webContents.loadFile(path.join(__dirname, '..', 'render', 'editor', 'editor.html'));
  editorView.setBounds({ x: 10, y: 50, width: 380, height: 510 });  
};

exports.addTo = addTo;