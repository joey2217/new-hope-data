import React from 'react'
import { ThemeProvider } from './components/theme-provider'
import { RouterProvider } from 'react-router'
import router from './router'
import { Toaster } from '@/components/ui/sonner'

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  )
}

export default App
