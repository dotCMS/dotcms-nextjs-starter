// Dependencies
import dynamic from 'next/dynamic'

// Basic Nodes
export * from './BasicNodes'

// Nodes
export const DotSBRender = dynamic(() => import('./DotSBRender'))
export const TextNode = dynamic(() => import('./TextNode'))
export const DotContent = dynamic(() => import('./DotContent/DotContent'))
export const DotImage = dynamic(() => import('./DotImage/DotImage'))
