import type { Route } from './+types/atoms.tags'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'ODS CSS - Tags info' }, { name: 'description', content: 'ODS CSS Tag info component' }]
}

export default function TagInfo() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <div className="tag">
            <span className="tag__label">Tag</span>
          </div>
        </div>
        <div>
          <div className="tag tag--with-icon ">
            <span className="tag__label">Tag with icon</span>
            <svg className="tag__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill-rule="evenodd"
                d="M12 22a10 10 0 1 0 0-20 10 10 0 1 0 0 20zm0-1.25a8.75 8.75 0 1 1 0-17.5 8.75 8.75 0 0 1 0 17.5zm-.052-2.85c-.432 0-.782-.384-.782-.864s.35-.87.782-.87h.172c.433 0 .783.4.783.87s-.35.864-.782.864zm-2.585-6.925a.781.781 0 0 1-.781-.782 3.4 3.4 0 0 1 3.41-3.411 3.4 3.4 0 0 1 2.412.998c.618.617 1 1.47 1 2.412s-.38 1.796-1 2.413a3.39 3.39 0 0 1-1.63.908v1.17a.781.781 0 1 1-1.564 0v-1.862a.78.78 0 0 1 .782-.779c.5 0 .975-.208 1.308-.542a1.845 1.845 0 1 0-2.617-2.617 1.847 1.847 0 0 0-.542 1.308.78.78 0 0 1-.778.783z"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  )
}
