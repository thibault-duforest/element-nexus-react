import type { Route } from './+types/component2'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Component 2' }, { name: 'description', content: 'Design System Component 2' }]
}

export default function Component2() {
  return (
    <>
      <p>Component 2</p>
    </>
  )
}
