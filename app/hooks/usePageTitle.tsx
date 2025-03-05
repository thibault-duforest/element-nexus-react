import { useContext } from 'react'

import { TitleContext } from '../providers/TitleProvider'

export const usePageTitle = () => useContext(TitleContext)
