import type { Route } from './+types/_index'
import Welcome from '../components/welcome'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'React integrator library' },
    { name: 'description', content: 'Showcase for html/css components' },
  ]
}

export default function Home() {
  return <Welcome />
}
