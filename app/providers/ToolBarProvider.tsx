import { createContext, useState } from 'react'

import { BackgroundMode } from '../types/toolbar'

type Toolbar = {
  backgroundMode: BackgroundMode
  setBackgroundMode: (c: BackgroundMode) => void
}

export const ToolbarContext = createContext<Toolbar>({
  backgroundMode: BackgroundMode.LIGHT,
  setBackgroundMode: function (c: BackgroundMode): void {},
})

const ToolbarProvider = ({ children }: { children: React.ReactNode }) => {
  const [backgroundMode, setBackgroundMode] = useState<BackgroundMode>(
    BackgroundMode.LIGHT,
  )

  return (
    <ToolbarContext.Provider value={{ backgroundMode, setBackgroundMode }}>
      {children}
    </ToolbarContext.Provider>
  )
}

export default ToolbarProvider
