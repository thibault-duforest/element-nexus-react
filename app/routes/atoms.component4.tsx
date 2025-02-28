import type { Route } from './+types/atoms.component4'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Component 4' }, { name: 'description', content: 'Design System Component 4' }]
}

export default function Component4() {
  return (
    <>
      <p>Component 4</p>
    </>
  )
}
