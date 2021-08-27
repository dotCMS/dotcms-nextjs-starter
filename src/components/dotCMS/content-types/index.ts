// Dependencies
import dynamic from 'next/dynamic'

export const Activity = dynamic(() => import('./Activity'))
export const Banner = dynamic(() => import('./Banner'))
export const BannerCarousel = dynamic(() => import('./BannerCarousel'))
export const CategoryFilter = dynamic(() => import('./CategoryFilter'))
export const Image = dynamic(() => import('./Image'))
export const Product = dynamic(() => import('./Product'))
export const StoreProductList = dynamic(() => import('./StoreProductList'))
export const Video = dynamic(() => import('./Video'))
export const Form = dynamic(() => import('./Form'))
export const WebPageContent = dynamic(() => import('./WebPageContent'))
