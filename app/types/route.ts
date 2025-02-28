type NavItem = {
    to?: string
    label?: string,
}

export interface NavMenu extends NavItem {
    categoryLabel?: string,
    items?: NavItem[]
}
