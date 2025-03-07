import { Tooltip } from 'react-tooltip'
import uniqid from 'uniqid'

import type { ToolBarButton, ToolBarButtonDarkLightMode } from '../../types/toolbar'

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

const ToolbarButton = ({ onClickFunc, isDarkMode, svgIconPath, hint, hintPosition, ref }: ToolBarButton) => {
  const tooltipId = `tooltip-${uniqid()}`

  return (
    <>
      <button
        ref={ref}
        onClick={onClickFunc}
        className={`p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100 text-gray-800${
          isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
        }`}
        data-tooltip-id={tooltipId}
        data-tooltip-content={hint}
        data-tooltip-place={hintPosition}
      >
        <ToolbarIcon icon={svgIconPath} alt={'Toggle pseudo classes'} isDarkMode={isDarkMode} />
      </button>
      <Tooltip id={tooltipId} />
    </>
  )
}

const ToolbarButtonDarkLightMode = ({
  toolbarButtonParams,
  lighSVGPath,
  darkSVGPath,
}: {
  toolbarButtonParams: ToolBarButtonDarkLightMode
  lighSVGPath: string
  darkSVGPath: string
}) => (
  <ToolbarButton {...toolbarButtonParams} svgIconPath={toolbarButtonParams.isDarkMode ? darkSVGPath : lighSVGPath} />
)

export { ToolbarButton, ToolbarButtonDarkLightMode }
