import { useState } from 'react'
import classNames from 'classnames'

import stylesheet from '../app.scss?url'
import { ViewPortMode } from '../types/toolbar'
import Toolbar from '../components/toolbar'
import FunctionalIFrameComponent from '../components/functionnalIFrame'

const MainContent = ({ children }: { children: React.ReactNode }) => {
  const [viewportMode, setViewportMode] = useState<ViewPortMode>(ViewPortMode.DESKTOP)
  const [isHoverFocusPseudoClassActive, setIsHoverFocusPseudoClassActive] = useState<boolean>(false)
  const [isActivePseudoClassActive, setIsActivePseudoClassActive] = useState<boolean>(false)
  const [isVisitedPseudoClassActive, setIsVisitedPseudoClassActive] = useState<boolean>(false)
  const [isFocusVisiblePseudoClassActive, setIsFocusVisiblePseudoClassActive] = useState<boolean>(false)
  const [isFocusWithinPseudoClassActive, setIsFocusWithinPseudoClassActive] = useState<boolean>(false)

  const onSwitchViewport = (mode: ViewPortMode) => {
    setViewportMode(mode)
  }

  return (
    <>
      <Toolbar onViewportChange={onSwitchViewport} />
      <div className="bg-slate-300 h-[calc(100%-104px)]">
        <link data-frame type="text/css" rel="stylesheet" href={stylesheet} />
        <FunctionalIFrameComponent
          classes={`mx-auto h-full ${classNames({
            'w-full': viewportMode === ViewPortMode.DESKTOP,
            'w-[1024px]': viewportMode === ViewPortMode.TABLET_LANDSCAPE,
            'w-[768px]': viewportMode === ViewPortMode.TABLET_PORTRAIT,
            'w-[480px]': viewportMode === ViewPortMode.MOBILE_LARGE,
            'w-[360px]': viewportMode === ViewPortMode.MOBILE_SMALL,
          })}`}
          styleSelector="link[data-frame]"
        >
          <div
            className={`transition-colors duration-200 p-4 h-full md:overflow-y-scroll ${classNames({
              'pseudo-hover pseudo-focus': isHoverFocusPseudoClassActive,
              'pseudo-active': isActivePseudoClassActive,
              'pseudo-visited': isVisitedPseudoClassActive,
              'pseudo-focus-visible': isFocusVisiblePseudoClassActive,
              'pseudo-focus-within': isFocusWithinPseudoClassActive,
            })}`}
          >
            {children}
          </div>
        </FunctionalIFrameComponent>
      </div>
    </>
  )
}

export default MainContent
