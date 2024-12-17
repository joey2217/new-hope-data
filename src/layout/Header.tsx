import React from 'react'
import { ModeToggle } from './mode-toggle'

const Header: React.FC = () => {
  return (
    <header className="titleBarContainer border-b">
      <div className="titleBar pr-2 flex gap-2 items-center">
        <div className="flex gap-2 items-center">data</div>
        <div className="flex-1 h-full draggable"></div>
        <ModeToggle />
      </div>
    </header>
  )
}

export default Header
