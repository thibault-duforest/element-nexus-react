import { Tooltip } from 'react-tooltip'
import uniqid from 'uniqid'
import classNames from 'classnames'

import type { ToolBarButton, ToolBarButtonDarkLightMode } from '../../types/toolbar'
import { IconName } from '../../types/icon'

const ToolbarButton = ({ onClickFunc, isDarkMode, iconName, rotateIcon, hint, hintPosition, ref }: ToolBarButton) => {
  const tooltipId = `tooltip-${uniqid()}`

  return (
    <>
      <button
        ref={ref}
        onClick={onClickFunc}
        className={`p-2 rounded-lg transition-colors duration-200
          svg-sprite-small-${iconName}
          ${classNames({
            'text-gray-400 hover:bg-gray-700 invert': isDarkMode,
            'text-gray-600 hover:bg-gray-100': !isDarkMode,
            'rotate-90': rotateIcon,
          })}`}
        data-tooltip-id={tooltipId}
        data-tooltip-content={hint}
        data-tooltip-place={hintPosition}
      >
        <span className="invisible text-[0]">{hint}</span>
      </button>
      <Tooltip id={tooltipId} />
    </>
  )
}

const ToolbarButtonDarkLightMode = ({
  toolbarButtonParams,
  lightSVGName,
  darkSVGName,
}: {
  toolbarButtonParams: ToolBarButtonDarkLightMode
  lightSVGName: IconName
  darkSVGName: IconName
}) => {
  const { isDarkMode } = toolbarButtonParams

  return <ToolbarButton {...toolbarButtonParams} iconName={isDarkMode ? darkSVGName : lightSVGName} />
}

export { ToolbarButton, ToolbarButtonDarkLightMode }
