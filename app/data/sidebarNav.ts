import type { NavMenu } from "../types/route"

const sidebarNavMenu: NavMenu[] = [
    {
        to: '/component1',
        label: 'Component 1',
    },
    {
        to: '/component2',
        label: 'Component 2',
    },
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
