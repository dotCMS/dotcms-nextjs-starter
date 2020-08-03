import dynamic from 'next/dynamic';

// CONTENT TYPES COMPONENTS
export const Activity = dynamic(() => import('./Activity'));
export const Banner = dynamic(() => import('./Banner'));
export const CategoryFilter = dynamic(() => import('./CategoryFilter'));
export const Image = dynamic(() => import('./Image'));
export const SimpleWidget = dynamic(() => import('./SimpleWidget'));
export const BannerCarousel = dynamic(() => import('./BannerCarousel'));
export const StoreProductList = dynamic(() => import('./StoreProductList'));
export const webPageContent = dynamic(() => import('./webPageContent'));
export const Product = dynamic(() => import('./Product'));
export const Video = dynamic(() => import('./Video'));

// PAGE COMPONENTS
export const ProductDetail = dynamic(() => import('../pages/ProductDetail'));
export const calendarEventDetail = dynamic(() => import('../pages/calendarEventDetail'));
export const BlogDetail = dynamic(() => import('../pages/BlogDetail'));
export const ActivityDetail = dynamic(() => import('../pages/ActivityDetail'));