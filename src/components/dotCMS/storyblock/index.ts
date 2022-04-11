// Dependencies
import dynamic from 'next/dynamic'

export const Storyblock = dynamic(() => import('./Storyblock'))
export const Paragraph = dynamic(() => import('./Paragraph'))
export const Heading = dynamic(() => import('./Heading'))
export const BulletList = dynamic(() => import('./BulletList'))
export const OrderedList = dynamic(() => import('./OrderedList'))
export const ListItem = dynamic(() => import('./ListItem'))
export const DotContent = dynamic(() => import('./dotContent/DotContent'))
