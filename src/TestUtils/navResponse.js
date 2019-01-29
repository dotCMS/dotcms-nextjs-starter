export const NavResponse = {
    entity: {
        children: [
            {
                href: '/about',
                title: 'About Us',
                folder: '123',
                type: 'htmlpage',
                children: []
            },
            {
                href: '/products',
                title: 'Products',
                folder: '456',
                type: 'htmlpage',
                children: []
            },
            {
                href: '/resources',
                title: 'Resources',
                folder: '789',
                type: 'folder',
                children: [
                    {
                        href: '/videos',
                        title: 'Videos',
                        type: 'htmlpage',
                        folder: null
                    },
                    {
                        href: '/blog',
                        title: 'Blog',
                        type: 'htmlpage',
                        folder: null
                    }
                ]
            }
        ]
    }
};
