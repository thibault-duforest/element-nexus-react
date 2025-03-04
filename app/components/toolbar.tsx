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
import iconSun from '../medias/svg/sun.svg'
import iconMoon from '../medias/svg/moon.svg'
import iconFullscreen from '../medias/svg/fullscreen.svg'

const ToolbarIcon = ({
  icon,
  alt,
  classes,
  isDarkMode,
}: {
  icon: string
  alt: string
  classes?: string
  isDarkMode: boolean
}) => (
  <img className={`block w-4 h-4${isDarkMode ? ' invert' : ''}${classes ? ` ${classes}` : ''}`} src={icon} alt={alt} />
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
  onToggleBackgroundMode,
  onToggleFullscreen,
}: {
  onViewportChange: (mode: ViewPortMode) => void
  onTogglePseudoClass: (pseudoClass: PseudoClasses) => void
  onToggleBackgroundMode: (isDarkMode: boolean) => void
  onToggleFullscreen: () => void
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

  const togglePseudoClass = (pseudoClass: PseudoClasses) => {
    const pseudoClassActive = {
      ...isPseudoClassActive,
      [pseudoClass]: !isPseudoClassActive[pseudoClass],
    }

    onTogglePseudoClass(pseudoClass)
    setIsPseudoClassActive(pseudoClassActive)
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const toggleFullscreen = () => {
    onToggleFullscreen()
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

  useEffect(() => {
    onToggleBackgroundMode(isDarkMode)
  }, [isDarkMode])

  return (
    <div
      className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} relative shadow-md transition-colors duration-300 z-50`}
    >
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="w-10">
            <button
              ref={pseudoClassButtonRef}
              onClick={() => setIsPseudoClassPopoverOpen(!isPseudoClassPopoverOpen)}
              className={`relative p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100 text-gray-800${
                isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
              data-tooltip-id="togglePseudoClass"
              data-tooltip-content="Toggle pseudo classes"
              data-tooltip-place="bottom"
            >
              <ToolbarIcon icon={iconPseudoClass} alt={'Toggle pseudo classes'} isDarkMode={isDarkMode} />
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
                viewport === ViewPortMode.DESKTOP
                  ? isDarkMode
                    ? 'bg-gray-600 text-white'
                    : 'bg-gray-200 text-gray-800'
                  : isDarkMode
                    ? 'text-gray-400 hover:bg-gray-700'
                    : 'text-gray-600 hover:bg-gray-100'
              }`}
              aria-label="Desktop View"
              data-tooltip-id="viewportDesktop"
              data-tooltip-content="Desktop view"
              data-tooltip-place="bottom"
            >
              <ToolbarIcon icon={iconDesktop} alt={'Switch to desktop view'} isDarkMode={isDarkMode} />
            </button>
            <button
              onClick={() => handleViewportChange(ViewPortMode.TABLET_LANDSCAPE)}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                viewport === ViewPortMode.TABLET_LANDSCAPE
                  ? isDarkMode
                    ? 'bg-gray-600 text-white'
                    : 'bg-gray-200 text-gray-800'
                  : isDarkMode
                    ? 'text-gray-400 hover:bg-gray-700'
                    : 'text-gray-600 hover:bg-gray-100'
              }`}
              aria-label="Tablet View"
              data-tooltip-id="viewportTablet"
              data-tooltip-content="Tablet landscape view"
              data-tooltip-place="bottom"
            >
              <ToolbarIcon
                icon={iconTablet}
                alt={'Switch to tablet landscape view'}
                classes="rotate-90"
                isDarkMode={isDarkMode}
              />
            </button>
            <button
              onClick={() => handleViewportChange(ViewPortMode.TABLET_PORTRAIT)}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                viewport === ViewPortMode.TABLET_PORTRAIT
                  ? isDarkMode
                    ? 'bg-gray-600 text-white'
                    : 'bg-gray-200 text-gray-800'
                  : isDarkMode
                    ? 'text-gray-400 hover:bg-gray-700'
                    : 'text-gray-600 hover:bg-gray-100'
              }`}
              aria-label="Tablet View"
              data-tooltip-id="viewportTablet"
              data-tooltip-content="Tablet portrait view"
              data-tooltip-place="bottom"
            >
              <ToolbarIcon icon={iconTablet} alt={'Switch to tablet portrait view'} isDarkMode={isDarkMode} />
            </button>
            <button
              onClick={() => handleViewportChange(ViewPortMode.MOBILE_LARGE)}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                viewport === ViewPortMode.MOBILE_LARGE
                  ? isDarkMode
                    ? 'bg-gray-600 text-white'
                    : 'bg-gray-200 text-gray-800'
                  : isDarkMode
                    ? 'text-gray-400 hover:bg-gray-700'
                    : 'text-gray-600 hover:bg-gray-100'
              }`}
              aria-label="Mobile View"
              data-tooltip-id="viewportMobile"
              data-tooltip-content="Large mobile view"
              data-tooltip-place="bottom"
            >
              <ToolbarIcon icon={iconMobileLarge} alt={'Switch to large mobile view'} isDarkMode={isDarkMode} />
            </button>
            <button
              onClick={() => handleViewportChange(ViewPortMode.MOBILE_SMALL)}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                viewport === ViewPortMode.MOBILE_SMALL
                  ? isDarkMode
                    ? 'bg-gray-600 text-white'
                    : 'bg-gray-200 text-gray-800'
                  : isDarkMode
                    ? 'text-gray-400 hover:bg-gray-700'
                    : 'text-gray-600 hover:bg-gray-100'
              }`}
              aria-label="Mobile View"
              data-tooltip-id="viewportMobile"
              data-tooltip-content="Small mobile view"
              data-tooltip-place="bottom"
            >
              <ToolbarIcon icon={iconMobile} alt={'Switch to small mobile view'} isDarkMode={isDarkMode} />
            </button>
          </div>
          <div>
            <button
              onClick={toggleFullscreen}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                isDarkMode ? 'text-yellow-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
              aria-label="Switch to Fullscreen view"
              data-tooltip-id="fullscreenView"
              data-tooltip-content={`Switch to fullscreen view`}
              data-tooltip-place="bottom"
            >
              <ToolbarIcon icon={iconFullscreen} alt={'Switch to fullscreen'} isDarkMode={isDarkMode} />
            </button>
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                isDarkMode ? 'text-yellow-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
              aria-label="Toggle Dark Mode"
              data-tooltip-id="backgroundMode"
              data-tooltip-content={`Toggle ${isDarkMode ? 'light' : 'dark'} mode`}
              data-tooltip-place="bottom"
            >
              {isDarkMode ? (
                <ToolbarIcon icon={iconSun} alt={'Switch to dark mode'} isDarkMode={isDarkMode} />
              ) : (
                <ToolbarIcon icon={iconMoon} alt={'Switch to light mode'} isDarkMode={isDarkMode} />
              )}
            </button>
          </div>
        </div>
      </div>
      <Tooltip id="togglePseudoClass" />
      <Tooltip id="viewportDesktop" />
      <Tooltip id="viewportTablet" />
      <Tooltip id="viewportMobile" />
      <Tooltip id="backgroundMode" />
      <Tooltip id="fullscreenView" />
    </div>
  )
}

export default Toolbar
