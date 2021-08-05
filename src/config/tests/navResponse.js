export const NavResponse = {
  entity: {
    children: [
      {
        href: '/about',
        title: 'About Us',
        folder: '123',
        type: 'htmlpage',
        children: [],
        hash: 123,
      },
      {
        href: '/products',
        title: 'Products',
        folder: '456',
        type: 'htmlpage',
        children: [],
        hash: 1234,
      },
      {
        href: '/resources',
        title: 'Resources',
        folder: '789',
        type: 'folder',
        hash: 4343,
        children: [
          {
            href: '/videos',
            title: 'Videos',
            type: 'htmlpage',
            folder: null,
            hash: 4563,
          },
          {
            href: '/blog',
            title: 'Blog',
            type: 'htmlpage',
            folder: null,
            hash: 1249,
          },
        ],
      },
    ],
  },
}
