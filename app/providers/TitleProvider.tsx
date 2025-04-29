import { useState } from 'react'

import TitleContext from '../context/TitleContext'

const TitleProvider = ({ children }: { children: React.ReactNode }) => {
  const [title, setTitle] = useState<null | string>(null)

  return <TitleContext.Provider value={{ title, setTitle }}>{children}</TitleContext.Provider>
}

export default TitleProvider
