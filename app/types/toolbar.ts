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
