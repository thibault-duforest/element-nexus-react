import { useEffect, useRef } from 'react'

const MenuListCategory = ({
  children,
  label,
  isOpen,
}: {
  children: React.ReactNode
  label: string
  isOpen: boolean
}) => {
  const summaryRef = useRef<HTMLDetailsElement>(null)

  useEffect(() => {
    if (isOpen && summaryRef.current) {
      summaryRef.current.click()
    }
  }, [])

  return (
    <li>
      <details className="group [&_summary::-webkit-details-marker]:hidden">
        <summary
          className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 bg-slate-100 hover:bg-slate-200 hover:text-gray-700"
          ref={summaryRef}
        >
          <span className="text-sm font-medium">{label}</span>

          <span className="shrink-0 transition duration-300 group-open:-rotate-180">
            <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </summary>

        <ul className="mt-2 space-y-1 pl-4">{children}</ul>
      </details>
    </li>
  )
}

export default MenuListCategory
