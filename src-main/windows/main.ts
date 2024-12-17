import { BrowserWindow, nativeTheme } from 'electron'
import * as path from 'node:path'
import { DEV, ROOT } from '../constant'

let win: BrowserWindow = null!
let quit = false

const DARK_BACK_COLOR = '#0c0a09'

export function create() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    titleBarStyle: 'hidden',
    backgroundColor: nativeTheme.shouldUseDarkColors ? DARK_BACK_COLOR : '#fff',
    titleBarOverlay: {
      color: nativeTheme.shouldUseDarkColors ? DARK_BACK_COLOR : '#fff',
      symbolColor: '#22c55e',
      height: 40,
    },
    webPreferences: {
      devTools: DEV,
      preload: path.join(ROOT, 'preload.cjs'),
      webSecurity: import.meta.env.PROD,
    },
  })
  win.once('ready-to-show', () => {
    win.show()
    if (DEV) {
      win.webContents.openDevTools({ mode: 'bottom' })
    }
  })

  win.on('close', (e) => {
    if (!quit) {
      e.preventDefault()
      win.hide()
    }
  })

  if (import.meta.env.DEV) {
    win.loadURL('http://localhost:5174')
  } else {
    win.loadFile(path.join(ROOT, 'renderer/index.html'))
  }
}

export function focus() {
  if (win) {
    if (win.isMinimized()) {
      win.restore()
    }
    win.show()
    win.focus()
  }
}

export function send(channel: string, ...args: unknown[]) {
  win.webContents.send(channel, ...args)
}

export function setMainTitleBarOverlay() {
  if (win) {
    win.setTitleBarOverlay({
      color: nativeTheme.shouldUseDarkColors ? DARK_BACK_COLOR : '#fff',
    })
  }
}

export function beforeQuit() {
  quit = true
}
