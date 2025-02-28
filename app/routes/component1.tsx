import type { Route } from './+types/component1'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Component 1' }, { name: 'description', content: 'Design System Component 1' }]
}

export default function Component1() {
  return (
    <>
      <p>Component 1</p>
    </>
  )
}
