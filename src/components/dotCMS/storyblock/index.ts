// Dependencies
import dynamic from 'next/dynamic'

// Basic Nodes
export * from './BasicNodes'

// Nodes
export const DotSBRender = dynamic(() => import('./DotSBRender'))
export const TextNode = dynamic(() => import('./TextNode'))
export const DotImage = dynamic(() => import('./DotImage'))
export const DotContent = dynamic(() => import('./DotContent'))
