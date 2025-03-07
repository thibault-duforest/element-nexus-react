import type { RefObject } from "react"
import type { TooltipPosition } from "./tooltip"

export enum ViewPortMode {
    DESKTOP,
    TABLET_LANDSCAPE,
    TABLET_PORTRAIT,
    MOBILE_LARGE,
    MOBILE_SMALL,
}

export enum PseudoClasses {
    HOVER_FOCUS,
    ACTIVE,
    VISITED,
    FOCUS_VISIBLE,
    FOCUS_WITHIN,
}

export type ActivePseudoClasses = {
    [key in PseudoClasses]: boolean
}

export enum BackgroundMode {
    LIGHT,
    DARK,
}

export interface ToolBarButton {
  onClickFunc: () => void
  isDarkMode: boolean
  svgIconPath: string
  hint: string
  hintPosition: TooltipPosition
  ref?: RefObject<HTMLButtonElement | null>
}

export interface ToolBarButtonDarkLightMode extends Omit<ToolBarButton, 'svgIconPath'> {}
