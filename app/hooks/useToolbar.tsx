import { useContext } from 'react'

import { ToolbarContext } from '../providers/ToolBarProvider'

export const useToolbar = () => useContext(ToolbarContext)
