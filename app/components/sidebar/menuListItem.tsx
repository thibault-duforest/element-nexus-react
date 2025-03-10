import { Link } from 'react-router'

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

export default MenuListItem
