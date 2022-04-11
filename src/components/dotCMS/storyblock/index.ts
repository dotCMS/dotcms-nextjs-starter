// Dependencies
import dynamic from 'next/dynamic'

export const Storyblock = dynamic(() => import('./Storyblock'))
export const Paragraph = dynamic(() => import('./Paragraph'))
export const Heading = dynamic(() => import('./Heading'))
export const BulletList = dynamic(() => import('./BulletList'))
export const OrderedList = dynamic(() => import('./OrderedList'))
export const CodeBlock = dynamic(() => import('./CodeBlock'))
export const ListItem = dynamic(() => import('./ListItem'))
export const BlockQuote = dynamic(() => import('./BlockQuote'))
export const HorizontalRule = dynamic(() => import('./HorizontalRule'))
export const DotContent = dynamic(() => import('./DotContent/DotContent'))
export const DotImage = dynamic(() => import('./DotImage/DotImage'))
