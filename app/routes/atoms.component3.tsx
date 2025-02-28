import type { Route } from './+types/atoms.component3'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Component 3' }, { name: 'description', content: 'Design System Component 3' }]
}

export default function Component3() {
  return (
    <>
      <p>Component 3</p>
    </>
  )
}
