import type { NavMenu } from "../types/route"

const sidebarNavMenu: NavMenu[] = [
    {
        categoryLabel: 'Atoms',
        items: [
            {
                to: '/atoms/buttons',
                label: 'Buttons',
            },
            {
                to: '/atoms/tags',
                label: 'Tags',
            },
        ],
    },
]

export default sidebarNavMenu;
