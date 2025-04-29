import { createContext } from 'react'

import type { Title } from '../types/title'

const TitleContext = createContext<Title>({
    title: null,
    setTitle: function (c: string | null): void { },
})

export default TitleContext
