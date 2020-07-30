import dynamic from 'next/dynamic';

export const Activity = dynamic(() => import('./Activity'));
export const Banner = dynamic(() => import('./Banner'));
export const CategoryFilter = dynamic(() => import('./CategoryFilter'));
export const Image = dynamic(() => import('./Image'));
export const ProductDetail = dynamic(() => import('./ProductDetail'));
export const calendarEventDetail = dynamic(() => import('./calendarEventDetail'));
export const BlogDetail = dynamic(() => import('./BlogDetail'));
export const ActivityDetail = dynamic(() => import('./ActivityDetail'));
export const SimpleWidget = dynamic(() => import('./SimpleWidget'));
export const StoreProductList = dynamic(() => import('./StoreProductList'));
export const webPageContent = dynamic(() => import('./webPageContent'));
export const Product = dynamic(() => import('./Product'));
export const Video = dynamic(() => import('./Video'));
