import { createContext } from 'react'

import { BackgroundMode, type Toolbar } from '../types/toolbar'

const ToolbarContext = createContext<Toolbar>({
    backgroundMode: BackgroundMode.LIGHT,
    setBackgroundMode: function (c: BackgroundMode): void { },
})

export default ToolbarContext;
