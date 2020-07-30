import dynamic from 'next/dynamic';

export const Activity = dynamic(() => import('../content-types/Activity'));
export const Banner = dynamic(() => import('../content-types/Banner'));
export const CategoryFilter = dynamic(() => import('../content-types/CategoryFilter'));
export const Image = dynamic(() => import('../content-types/Image'));
export const ProductDetail = dynamic(() => import('./ProductDetail'));
export const calendarEventDetail = dynamic(() => import('./calendarEventDetail'));
export const BlogDetail = dynamic(() => import('./BlogDetail'));
export const ActivityDetail = dynamic(() => import('./ActivityDetail'));
export const SimpleWidget = dynamic(() => import('../content-types/SimpleWidget'));
export const StoreProductList = dynamic(() => import('../content-types/StoreProductList'));
export const webPageContent = dynamic(() => import('../content-types/webPageContent'));
export const Product = dynamic(() => import('../content-types/Product'));
export const Video = dynamic(() => import('../content-types/Video'));
