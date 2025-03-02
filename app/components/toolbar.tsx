import type { RefObject } from 'react'
import { useEffect, useRef, useState } from 'react'
import { Tooltip } from 'react-tooltip'

import type { ActivePseudoClasses } from '../types/toolbar'
import { ViewPortMode, PseudoClasses } from '../types/toolbar'
import { countTruthyValues } from '../utils/main'
import iconPseudoClass from '../medias/svg/pseudo_class.svg'
import iconDesktop from '../medias/svg/desktop.svg'
import iconTablet from '../medias/svg/tablet.svg'
import iconMobileLarge from '../medias/svg/mobile_large.svg'
import iconMobile from '../medias/svg/mobile.svg'
import iconCheckmark from '../medias/svg/checkmark.svg'

const ToolbarIcon = ({ icon, alt, classes }: { icon: string; alt: string; classes?: string }) => (
  <img className={`block w-4 h-4${classes ? ` ${classes}` : ''}`} src={icon} alt={alt} />
)

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

const Toolbar = ({
  onViewportChange,
  onTogglePseudoClass,
}: {
  onViewportChange: (mode: ViewPortMode) => void
  onTogglePseudoClass: (pseudoClass: PseudoClasses) => void
}) => {
  const [viewport, setViewport] = useState<ViewPortMode>(ViewPortMode.DESKTOP)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)
  const [isPseudoClassActive, setIsPseudoClassActive] = useState<ActivePseudoClasses>({
    [PseudoClasses.HOVER_FOCUS]: false,
    [PseudoClasses.ACTIVE]: false,
    [PseudoClasses.VISITED]: false,
    [PseudoClasses.FOCUS_VISIBLE]: false,
    [PseudoClasses.FOCUS_WITHIN]: false,
  })
  const [isPseudoClassPopoverOpen, setIsPseudoClassPopoverOpen] = useState<boolean>(false)
  const [activePseudoClassCount, setActivePseudoClassCount] = useState<number>(0)
  const pseudoClassPopoverRef = useRef<HTMLDivElement>(null)
  const pseudoClassButtonRef = useRef<HTMLButtonElement>(null)

  const handleViewportChange = (mode: ViewPortMode) => {
    setViewport(mode)
  }

  useEffect(() => {
    onViewportChange(viewport)
  }, [viewport])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !pseudoClassPopoverRef.current?.contains(event.target as Node) &&
        !pseudoClassButtonRef.current?.contains(event.target as Node)
      ) {
        setIsPseudoClassPopoverOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    setActivePseudoClassCount(countTruthyValues(isPseudoClassActive))
  }, [isPseudoClassActive])

  const togglePseudoClass = (pseudoClass: PseudoClasses) => {
    const pseudoClassActive = {
      ...isPseudoClassActive,
      [pseudoClass]: !isPseudoClassActive[pseudoClass],
    }

    onTogglePseudoClass(pseudoClass)
    setIsPseudoClassActive(pseudoClassActive)
  }

  return (
    <div className="relative shadow-md transition-colors duration-300 z-50">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="w-10">
            <button
              ref={pseudoClassButtonRef}
              onClick={() => setIsPseudoClassPopoverOpen(!isPseudoClassPopoverOpen)}
              className="relative p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100 text-gray-800"
              data-tooltip-id="togglePseudoClass"
              data-tooltip-content="Toggle pseudo classes"
              data-tooltip-place="bottom"
            >
              <ToolbarIcon icon={iconPseudoClass} alt={'Toggle pseudo classes'} />
              {activePseudoClassCount > 0 && (
                <span className="absolute right-0 bottom-0 w-4 h-4 rounded-full bg-orange-600 text-white text-xs">
                  {activePseudoClassCount}
                </span>
              )}
            </button>
            {isPseudoClassPopoverOpen && (
              <div
                ref={pseudoClassPopoverRef}
                className="absolute left-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none z-50"
              >
                <div className="py-1">
                  <PseudoClassMenuItem
                    label="Hover / Focus"
                    isActive={isPseudoClassActive[PseudoClasses.HOVER_FOCUS]}
                    onClick={() => togglePseudoClass(PseudoClasses.HOVER_FOCUS)}
                  />
                  <PseudoClassMenuItem
                    label="Active"
                    isActive={isPseudoClassActive[PseudoClasses.ACTIVE]}
                    onClick={() => togglePseudoClass(PseudoClasses.ACTIVE)}
                  />
                  <PseudoClassMenuItem
                    label="Visited"
                    isActive={isPseudoClassActive[PseudoClasses.VISITED]}
                    onClick={() => togglePseudoClass(PseudoClasses.VISITED)}
                  />
                  <PseudoClassMenuItem
                    label="Focus visible"
                    isActive={isPseudoClassActive[PseudoClasses.FOCUS_VISIBLE]}
                    onClick={() => togglePseudoClass(PseudoClasses.FOCUS_VISIBLE)}
                  />
                  <PseudoClassMenuItem
                    label="Focus within"
                    isActive={isPseudoClassActive[PseudoClasses.FOCUS_WITHIN]}
                    onClick={() => togglePseudoClass(PseudoClasses.FOCUS_WITHIN)}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleViewportChange(ViewPortMode.DESKTOP)}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                viewport === ViewPortMode.DESKTOP ? 'bg-gray-200 text-gray-800' : 'text-gray-600 hover:bg-gray-100'
              }`}
              aria-label="Desktop View"
              data-tooltip-id="viewportDesktop"
              data-tooltip-content="Desktop view"
              data-tooltip-place="bottom"
            >
              <ToolbarIcon icon={iconDesktop} alt={'Switch to desktop view'} />
            </button>
            <button
              onClick={() => handleViewportChange(ViewPortMode.TABLET_LANDSCAPE)}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                viewport === ViewPortMode.TABLET_LANDSCAPE
                  ? 'bg-gray-200 text-gray-800'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              aria-label="Tablet View"
              data-tooltip-id="viewportTablet"
              data-tooltip-content="Tablet landscape view"
              data-tooltip-place="bottom"
            >
              <ToolbarIcon icon={iconTablet} alt={'Switch to tablet landscape view'} classes="rotate-90" />
            </button>
            <button
              onClick={() => handleViewportChange(ViewPortMode.TABLET_PORTRAIT)}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                viewport === ViewPortMode.TABLET_PORTRAIT
                  ? 'bg-gray-200 text-gray-800'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              aria-label="Tablet View"
              data-tooltip-id="viewportTablet"
              data-tooltip-content="Tablet portrait view"
              data-tooltip-place="bottom"
            >
              <ToolbarIcon icon={iconTablet} alt={'Switch to tablet portrait view'} />
            </button>
            <button
              onClick={() => handleViewportChange(ViewPortMode.MOBILE_LARGE)}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                viewport === ViewPortMode.MOBILE_LARGE ? 'bg-gray-200 text-gray-800' : 'text-gray-600 hover:bg-gray-100'
              }`}
              aria-label="Mobile View"
              data-tooltip-id="viewportMobile"
              data-tooltip-content="Large mobile view"
              data-tooltip-place="bottom"
            >
              <ToolbarIcon icon={iconMobileLarge} alt={'Switch to large mobile view'} />
            </button>
            <button
              onClick={() => handleViewportChange(ViewPortMode.MOBILE_SMALL)}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                viewport === ViewPortMode.MOBILE_SMALL ? 'bg-gray-200 text-gray-800' : 'text-gray-600 hover:bg-gray-100'
              }`}
              aria-label="Mobile View"
              data-tooltip-id="viewportMobile"
              data-tooltip-content="Small mobile view"
              data-tooltip-place="bottom"
            >
              <ToolbarIcon icon={iconMobile} alt={'Switch to small mobile view'} />
            </button>
          </div>
        </div>
      </div>
      <Tooltip id="viewportDesktop" />
      <Tooltip id="viewportTablet" />
      <Tooltip id="viewportMobile" />
    </div>
  )
}

export default Toolbar
