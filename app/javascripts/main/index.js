'use strict'

const path = require('path')
const json = require('../../package.json')

const electron = require('electron')

electron.app.on('ready', () =>
{
    let window = new electron.BrowserWindow(
    {
        title: json.name,
        width: json.settings.width,
        height: json.settings.height,

        backgroundColor: '#cde',
        transparent: true,

        show: false
    })

    window.once('ready-to-show', () =>
    {
        window.maximize()
        window.show()
    })

    window.loadURL('file://' + path.join(__dirname, '..', '..') + '/index.html')

    window.webContents.on('did-finish-load', () =>
    {
        window.webContents.send('loaded',
        {
            appName: json.name,
            electronVersion: process.versions.electron,
            nodeVersion: process.versions.node,
            chromiumVersion: process.versions.chrome
        })
    })

    window.on('closed', () => window = null )
})
