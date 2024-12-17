import * as XLSX from 'xlsx'
import * as fsp from 'fs/promises'

// 01-郫县2024年2月累计订单.xlsx

const PHONE_NUMBER_KEY = '收货人手机号'
const NUMBER_KEY = '实际送达数量'
const SHEET_NAME = '模板'
export async function handleDeliverOrder(filepath: string) {
  const buffer = await fsp.readFile(filepath)
  const wb = XLSX.read(buffer)
  const sheet = wb.Sheets[SHEET_NAME]
  if (sheet) {
    const data: Record<string, unknown>[] = XLSX.utils.sheet_to_json(sheet)
    const map = new Map<string, number>()
    data.forEach((row) => {
      const phone = row[PHONE_NUMBER_KEY] as string
      const num = row[NUMBER_KEY] as number
      if (phone && num) {
        if (map.has(phone)) {
          map.set(phone, map.get(phone)! + num)
        } else {
          map.set(phone, num)
        }
      }
    })
    const nextData = Array.from(map.entries()).map(([k, v]) => ({
      [PHONE_NUMBER_KEY]: k,
      [NUMBER_KEY]: v,
    }))
    nextData.sort((a, b) =>
      (a[PHONE_NUMBER_KEY] as string).localeCompare(
        b[PHONE_NUMBER_KEY] as string
      )
    )
    const sum = nextData.reduce((acc, cur) => acc + cur[NUMBER_KEY], 0)
    nextData.push({
      [PHONE_NUMBER_KEY]: '总计',
      [NUMBER_KEY]: sum,
    })
    const nextDataName = `${NUMBER_KEY}_${Date.now()}`
    const ws = XLSX.utils.json_to_sheet(nextData)
    XLSX.utils.book_append_sheet(wb, ws, nextDataName)
    const bufferW = await XLSX.write(wb, { type: 'buffer' })
    await fsp.writeFile(filepath, bufferW)
    return map
  }
  throw new Error(`sheet ${SHEET_NAME} 不存在`)
}

// 郫县202403-04鲜驿站-配送单导出_20240501155900.xlsx
// export async function handleDeliverOrder(filepath: string) {
//   const res = await fsp.readFile(filepath)
//   const workbook = new Excel.Workbook()
//   await workbook.xlsx.load(res)
//   const map = new Map<string, number>()
//   const sheet = workbook.getWorksheet(1)
//   if (sheet) {
//     const row = sheet.getRow(1).values
//     if (Array.isArray(row)) {
//       // 收货人手机号
//       const phoneIndex = row.findIndex(
//         (item) => item?.toString() === PHONE_NUMER_KEY
//       )
//       const numIndex = row.findIndex((item) => item?.toString() === NUMBER_KEY)
//       sheet.eachRow((row, rowNumber) => {
//         if (rowNumber > 1) {
//           const phone = row.getCell(phoneIndex).value?.toString()
//           const numStr = row.getCell(numIndex).value?.toString()
//           const num = Number(numStr)
//           if (phone && num) {
//             if (map.has(phone)) {
//               map.set(phone, map.get(phone)! + num)
//             } else {
//               map.set(phone, num)
//             }
//           }
//         }
//       })
//       const nextSheet = workbook.addWorksheet(NUMBER_KEY, {
//         views: [{ state: 'frozen', ySplit: 1 }],
//       })
//       nextSheet.addRow([PHONE_NUMER_KEY, NUMBER_KEY])
//       Array.from(map.entries()).forEach(([key, value]) => {
//         nextSheet.addRow([key, value])
//       })
//       const buffer = await workbook.xlsx.writeBuffer()
//       await fsp.writeFile(filepath, Buffer.from(buffer))
//       return map
//     }
//   }
//   throw new Error('文件错误')
// }
