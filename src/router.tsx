import { createHashRouter } from 'react-router'
import Layout from './layout'
import Home from './pages/home'

const router = createHashRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
])

export default router
