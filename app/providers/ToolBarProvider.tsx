import { useState } from 'react'

import { BackgroundMode } from '../types/toolbar'

import ToolbarContext from '../context/ToolBarContext'

const ToolbarProvider = ({ children }: { children: React.ReactNode }) => {
  const [backgroundMode, setBackgroundMode] = useState<BackgroundMode>(BackgroundMode.LIGHT)

  return <ToolbarContext.Provider value={{ backgroundMode, setBackgroundMode }}>{children}</ToolbarContext.Provider>
}

export default ToolbarProvider
