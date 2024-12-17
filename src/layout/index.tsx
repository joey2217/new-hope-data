import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router'

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <main id="main" className="px-2 py-2">
        <Outlet />
      </main>
    </>
  )
}

export default Layout
