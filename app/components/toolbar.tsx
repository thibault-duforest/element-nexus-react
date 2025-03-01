import { useEffect, useRef, useState } from 'react'
import { Tooltip } from 'react-tooltip'

import { ViewPortMode } from '../types/toolbar'
import iconDesktop from '../medias/svg/desktop.svg'
import iconTablet from '../medias/svg/tablet.svg'
import iconMobileLarge from '../medias/svg/mobile_large.svg'
import iconMobile from '../medias/svg/mobile.svg'

const ToolbarIcon = ({ icon, alt, classes }: { icon: string; alt: string; classes?: string }) => (
  <img className={`block w-4 h-4${classes ? ` ${classes}` : ''}`} src={icon} alt={alt} />
)

const Toolbar = ({ onViewportChange }: { onViewportChange: (mode: ViewPortMode) => void }) => {
  const [viewport, setViewport] = useState<ViewPortMode>(ViewPortMode.DESKTOP)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)

  const handleViewportChange = (mode: ViewPortMode) => {
    setViewport(mode)
  }

  useEffect(() => {
    onViewportChange(viewport)
  }, [viewport])

  return (
    <div className="relative shadow-md transition-colors duration-300 z-50">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
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
