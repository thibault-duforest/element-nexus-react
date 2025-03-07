import type { Route } from './+types/_index'
import Home from '../views/home'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Element Nexus' }, { name: 'description', content: 'Showcase for html/css components' }]
}

export default function Index() {
  return <Home />
}
