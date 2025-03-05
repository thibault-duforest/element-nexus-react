import { Link, useLocation } from 'react-router'
import { useEffect, useRef } from 'react'

import type { NavMenu } from '../types/route'
import sidebarNavMenu from '../data/sidebarNav'

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

const MenuListItem = ({ to, label, isActive }: { to: string; label: string; isActive: boolean }) => (
  <li>
    <Link
      to={to}
      className={`block rounded-lg px-4 py-2 text-sm text-slate-800 ${
        isActive ? 'bg-slate-300 font-bold cursor-default' : 'bg-slate-100 hover:bg-slate-200 font-medium'
      }`}
    >
      {label}
    </Link>
  </li>
)

const SidebarNavigation = () => {
  const { pathname } = useLocation()

  return (
    <div className="sidebar flex h-screen flex-col justify-between border-e bg-white">
      <div className="px-4 py-6">
        <div className="text-center">
          <Link to="/" className="inline-block">
            <span className="inline-block mt-4 font-bold">Design System components</span>
          </Link>
        </div>

        <nav>
          <ul className="mt-6 space-y-1">
            {sidebarNavMenu.map((navItem: NavMenu, i: number) => {
              if (navItem.items && navItem.items.length > 0) {
                const isCurrentRouteInCategory = navItem.items.filter(item => pathname === item.to).length > 0

                return (
                  <MenuListCategory label={navItem.categoryLabel as string} isOpen={isCurrentRouteInCategory} key={i}>
                    {navItem.items.map((item, j) => (
                      <MenuListItem
                        to={item.to as string}
                        label={item.label as string}
                        isActive={pathname === item.to}
                        key={j}
                      />
                    ))}
                  </MenuListCategory>
                )
              }

              return (
                <MenuListItem
                  to={navItem.to as string}
                  label={navItem.label as string}
                  isActive={pathname === navItem.to}
                  key={i}
                />
              )
            })}
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default SidebarNavigation
