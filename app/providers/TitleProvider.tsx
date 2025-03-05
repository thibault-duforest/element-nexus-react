import { createContext, useState } from 'react'

type Title = {
  title: string | null
  setTitle: (c: string | null) => void
}

export const TitleContext = createContext<Title>({
  title: null,
  setTitle: function (c: string | null): void {},
})

const TitleProvider = ({ children }: { children: React.ReactNode }) => {
  const [title, setTitle] = useState<null | string>(null)

  return (
    <TitleContext.Provider value={{ title, setTitle }}>
      {children}
    </TitleContext.Provider>
  )
}

export default TitleProvider
