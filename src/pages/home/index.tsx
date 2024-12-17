import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import React from 'react'
import { toast } from "sonner"

const Home: React.FC = () => {
  const handleDeliverOrder = () => {
    window.electronAPI.handleDeliverOrder().then(()=>{
      toast.success("配送单操作成功")
    }).catch((e)=>{
      console.error(e);
      toast.error      ("配送单操作失败")
    })
  }
  return (
    <div>
      <div className='flex gap-2'>
        <Label>配送单</Label>
        <Button onClick={handleDeliverOrder}>配送单</Button>
      </div>
    </div>
  )
}

export default Home
