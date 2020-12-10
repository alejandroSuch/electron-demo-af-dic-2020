const { ipcRenderer } = require('electron');

ipcRenderer.on('html-changed', (_event, html) => {
    document.body.innerHTML = html;
});