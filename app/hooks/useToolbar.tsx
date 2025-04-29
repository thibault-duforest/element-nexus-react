import { useContext } from 'react'

import ToolbarContext from '../context/ToolBarContext'

export const useToolbar = () => useContext(ToolbarContext)
