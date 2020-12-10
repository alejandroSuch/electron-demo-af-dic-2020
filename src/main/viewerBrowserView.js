const { BrowserView } = require('electron');
const path = require('path');

const addTo = browserWindow => {

  const viewerView = new BrowserView({
    webPreferences: {
      preload: path.join(__dirname, '..', 'render', 'viewer', 'viewer.js')
    }
  });
  browserWindow.addBrowserView(viewerView)
  viewerView.webContents.loadFile(path.join(__dirname, '..', 'render', 'viewer', 'viewer.html'));
  viewerView.setBounds({ x: 410, y: 50, width: 380, height: 510 });  
};

exports.addTo = addTo;