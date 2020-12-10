const {
    ipcMain,
    webContents
} = require('electron');
const markdown = require( 'markdown' ).markdown;

const init = () => {
    ipcMain.on('markdown-changed', (_event, text) => {
        const html = markdown.toHTML(text);
        webContents.getAllWebContents()
            .forEach(
                wc => wc.send('html-changed', html)
            );
      });
};

exports.init = init;