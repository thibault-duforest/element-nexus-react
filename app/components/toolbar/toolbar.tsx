import { useEffect, useRef, useState } from 'react'
import { Tooltip } from 'react-tooltip'

import type { ActivePseudoClasses } from '../../types/toolbar'
import { ViewPortMode, PseudoClasses } from '../../types/toolbar'
import { TooltipPosition } from '../../types/tooltip'
import { countTruthyValues } from '../../utils/main'
import { ToolbarButton, ToolbarButtonDarkLightMode } from './toolbarButtons'
import PseudoClassMenuItem from './pseudoClassMenuItem'
import iconPseudoClass from '../../medias/svg/pseudo_class.svg'
import iconDesktop from '../../medias/svg/desktop.svg'
import iconTablet from '../../medias/svg/tablet.svg'
import iconMobileLarge from '../../medias/svg/mobile_large.svg'
import iconMobile from '../../medias/svg/mobile.svg'
import iconSun from '../../medias/svg/sun.svg'
import iconMoon from '../../medias/svg/moon.svg'
import iconFullscreen from '../../medias/svg/fullscreen.svg'

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
            <div className="relative">
              <ToolbarButton
                ref={pseudoClassButtonRef}
                onClickFunc={() => setIsPseudoClassPopoverOpen(!isPseudoClassPopoverOpen)}
                isDarkMode={isDarkMode}
                svgIconPath={iconPseudoClass}
                hint="Toggle pseudo classes"
                hintPosition={TooltipPosition.BOTTOM}
              />
              {activePseudoClassCount > 0 && (
                <span className="absolute right-0 bottom-0 w-4 h-4 rounded-full bg-orange-600 text-white text-xs text-center">
                  {activePseudoClassCount}
                </span>
              )}
            </div>
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
            <ToolbarButton
              onClickFunc={() => handleViewportChange(ViewPortMode.DESKTOP)}
              isDarkMode={isDarkMode}
              svgIconPath={iconDesktop}
              hint="Desktop View"
              hintPosition={TooltipPosition.BOTTOM}
            />
            <ToolbarButton
              onClickFunc={() => handleViewportChange(ViewPortMode.TABLET_LANDSCAPE)}
              isDarkMode={isDarkMode}
              svgIconPath={iconTablet}
              hint="Tablet landscape view"
              hintPosition={TooltipPosition.BOTTOM}
            />
            <ToolbarButton
              ref={pseudoClassButtonRef}
              onClickFunc={() => handleViewportChange(ViewPortMode.TABLET_PORTRAIT)}
              isDarkMode={isDarkMode}
              svgIconPath={iconTablet}
              hint="Tablet portrait View"
              hintPosition={TooltipPosition.BOTTOM}
            />
            <ToolbarButton
              onClickFunc={() => handleViewportChange(ViewPortMode.MOBILE_LARGE)}
              isDarkMode={isDarkMode}
              svgIconPath={iconMobileLarge}
              hint="Large mobile view"
              hintPosition={TooltipPosition.BOTTOM}
            />
            <ToolbarButton
              onClickFunc={() => handleViewportChange(ViewPortMode.MOBILE_SMALL)}
              isDarkMode={isDarkMode}
              svgIconPath={iconMobile}
              hint="Small mobile view"
              hintPosition={TooltipPosition.BOTTOM}
            />
          </div>
          <div>
            <ToolbarButton
              onClickFunc={toggleFullscreen}
              isDarkMode={isDarkMode}
              svgIconPath={iconFullscreen}
              hint="Switch to fullscreen view"
              hintPosition={TooltipPosition.BOTTOM}
            />
            <ToolbarButtonDarkLightMode
              toolbarButtonParams={{
                onClickFunc: toggleDarkMode,
                isDarkMode: isDarkMode,
                hint: `Toggle ${isDarkMode ? 'light' : 'dark'} mode`,
                hintPosition: TooltipPosition.BOTTOM,
              }}
              lighSVGPath={iconSun}
              darkSVGPath={iconMoon}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Toolbar
