import type { Route } from './+types/atoms.buttons'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'ODS CSS - Buttons' }, { name: 'description', content: 'ODS CSS Button component' }]
}

export default function Buttons() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-4 border-b border-solid border-slate-500">Buttons</h1>
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
