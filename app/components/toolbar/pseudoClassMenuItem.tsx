import iconCheckmark from '../../medias/svg/checkmark.svg'

const PseudoClassMenuItem = ({
  label,
  isActive,
  onClick,
}: {
  label: string
  isActive: boolean
  onClick: () => void
}) => (
  <button
    onClick={onClick}
    className={`group flex items-center mb-1 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full${
      isActive ? ' bg-gray-200 hover:bg-gray-200' : ''
    }`}
  >
    <span className={`flex-1 text-left${isActive ? '' : ' pr-8'}`}>{label}</span>
    {isActive && <img className="block w-4 h-4 ml-4" src={iconCheckmark} />}
  </button>
)

export default PseudoClassMenuItem
