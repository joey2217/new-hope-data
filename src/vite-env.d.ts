/// <reference types="vite/client" />

export interface Argv {
  node: string
  chrome: string
  electron: string
  version: string
  dev: boolean
  platform:
    | 'aix'
    | 'darwin'
    | 'freebsd'
    | 'linux'
    | 'openbsd'
    | 'sunos'
    | 'win32'
}

export interface ElectronAPI {
  handleDeliverOrder: () => Promise<void>
}

export declare global {
  interface Window {
    electronAPI: ElectronAPI
    messageAPI: MessageAPI
    devAPI: IDevAPI
    argv: Argv
  }
}
