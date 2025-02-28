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
                to: '/atoms/component3',
                label: 'Component 3',
            },
            {
                to: '/atoms/component4',
                label: 'Component 4',
            },
        ],
    },
]

export default sidebarNavMenu;
