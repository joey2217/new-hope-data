import { expect, test, describe } from 'vitest'
import { handleDeliverOrder } from '../src-main/handler/order'

describe(
  'handleDeliver',
  {
    timeout: 0,
  },
  () => {
    test('handleDeliver', async () => {
      const res = await handleDeliverOrder(
        'D:\\wenjie\\wangwenjie\\奶站文件\\01-郫县\\新建文件夹\\郫县202403-04鲜驿站-配送单导出_20240501155900 - 副本.xlsx'
      )
      expect(Array.from(res.keys()).length).greaterThan(0)
    })
  }
)
