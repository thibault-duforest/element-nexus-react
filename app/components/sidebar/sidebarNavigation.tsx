import { useLocation } from 'react-router'

import type { NavMenu } from '../../types/route'
import sidebarNavMenuData from '../../data/sidebarNav'
import MenuHeading from './menuHeading'
import MenuListCategory from './menuListCategory'
import MenuListItem from './menuListItem'

const SidebarNavigation = () => {
  const { pathname } = useLocation()

  return (
    <div className="sidebar flex h-screen flex-col justify-between border-e bg-white">
      <div className="px-4 py-6">
        <MenuHeading />

        <nav>
          <ul className="mt-6 space-y-1">
            {sidebarNavMenuData.map((navItem: NavMenu, i: number) => {
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
