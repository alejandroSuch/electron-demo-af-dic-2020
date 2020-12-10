const { ipcRenderer } = require('electron');

let timeout;

window.markdownChanged = text => {
  if(!!timeout) {
    clearTimeout(timeout);
  }

  timeout = setTimeout(() => {
    ipcRenderer.send('markdown-changed', text);
  }, 500);
};