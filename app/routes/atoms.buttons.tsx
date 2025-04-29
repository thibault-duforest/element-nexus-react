import { useEffect } from 'react'

import type { Route } from './+types/atoms.buttons'
import { usePageTitle } from '../hooks/usePageTitle'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Buttons - Element Nexus - React' }, { name: 'description', content: 'Button component' }]
}

export default function Buttons() {
  const { setTitle } = usePageTitle()

  useEffect(() => {
    setTitle('Buttons')
  }, [])

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Primary buttons</h2>
      <div className="mb-2">
        <a href="#" className="mb-4 button button-primary" onClick={e => e.preventDefault()}>
          Link primary button
        </a>
        <button className="mb-4 button button-primary" type="button">
          Button primary
        </button>
        <button className="mb-4 button button-primary" type="button" disabled>
          Button primary disabled
        </button>
      </div>
    </>
  )
}
