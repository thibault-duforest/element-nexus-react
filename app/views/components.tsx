import { useState } from 'react'
import classNames from 'classnames'

import stylesheet from '../assets/scss/app.scss?url'
import { ViewPortMode, PseudoClasses, BackgroundMode } from '../types/toolbar'
import { usePageTitle } from '../hooks/usePageTitle'
import { useToolbar } from '../hooks/useToolbar'
import ContentHeader from '../components/contentHeader'
import Toolbar from '../components/toolbar/toolbar'
import FunctionalIFrameComponent from '../components/functionnalIFrame'

const MainContent = ({ children, onFullscreenView }: { children: React.ReactNode; onFullscreenView: () => void }) => {
  const { title } = usePageTitle()
  const { backgroundMode, setBackgroundMode } = useToolbar()
  const [viewportMode, setViewportMode] = useState<ViewPortMode>(ViewPortMode.DESKTOP)
  const [isHoverFocusPseudoClassActive, setIsHoverFocusPseudoClassActive] = useState<boolean>(false)
  const [isActivePseudoClassActive, setIsActivePseudoClassActive] = useState<boolean>(false)
  const [isVisitedPseudoClassActive, setIsVisitedPseudoClassActive] = useState<boolean>(false)
  const [isFocusVisiblePseudoClassActive, setIsFocusVisiblePseudoClassActive] = useState<boolean>(false)
  const [isFocusWithinPseudoClassActive, setIsFocusWithinPseudoClassActive] = useState<boolean>(false)

  const onSwitchViewport = (mode: ViewPortMode) => {
    setViewportMode(mode)
  }

  const onTogglePseudoClass = (pseudoClass: PseudoClasses) => {
    switch (pseudoClass) {
      case PseudoClasses.HOVER_FOCUS:
        setIsHoverFocusPseudoClassActive(!isHoverFocusPseudoClassActive)
        break
      case PseudoClasses.ACTIVE:
        setIsActivePseudoClassActive(!isActivePseudoClassActive)
        break
      case PseudoClasses.VISITED:
        setIsVisitedPseudoClassActive(!isVisitedPseudoClassActive)
        break
      case PseudoClasses.FOCUS_VISIBLE:
        setIsFocusVisiblePseudoClassActive(!isFocusVisiblePseudoClassActive)
        break
      case PseudoClasses.FOCUS_WITHIN:
        setIsFocusWithinPseudoClassActive(!isFocusWithinPseudoClassActive)
        break
    }
  }

  const onToggleBackgroundMode = (isDarkMode: boolean) => {
    const mode = isDarkMode ? BackgroundMode.DARK : BackgroundMode.LIGHT

    setBackgroundMode(mode)
  }

  return (
    <>
      {!!title && <ContentHeader title={title} />}
      <Toolbar
        onViewportChange={onSwitchViewport}
        onTogglePseudoClass={onTogglePseudoClass}
        onToggleBackgroundMode={onToggleBackgroundMode}
        onToggleFullscreen={onFullscreenView}
      />
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
              'bg-white': backgroundMode === BackgroundMode.LIGHT,
              'bg-black': backgroundMode === BackgroundMode.DARK,
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
