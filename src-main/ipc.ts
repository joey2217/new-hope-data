import { app, dialog, ipcMain } from 'electron/main'
import { handleDeliverOrder } from './handler/order'

app.whenReady().then(() => {
  // 配送单处理
  ipcMain.handle('HANDLE_DELIVER_ORDER', () =>
    dialog
      .showOpenDialog({
        title: '选择配送单',
        filters: [
          { name: 'Excel', extensions: ['xlsx', 'xls'] },
          { name: 'All Files', extensions: ['*'] },
        ],
        properties: ['openFile'],
      })
      .then(({ canceled, filePaths }) => {
        if (!canceled && filePaths.length > 0) {
          const filePath = filePaths[0]
          return handleDeliverOrder(filePath)
        }
      })
  )
})
