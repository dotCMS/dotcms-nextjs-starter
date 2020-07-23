import dynamic from 'next/dynamic';

export const Activity = dynamic(() => import('../content-types/Activity'));
export const Banner = dynamic(() => import('../content-types/Banner'));
export const CategoryFilter = dynamic(() => import('../content-types/CategoryFilter'));
export const ProductDetail = dynamic(() => import('./ProductDetail'));
export const SimpleWidget = dynamic(() => import('../content-types/SimpleWidget'));
export const StoreProductList = dynamic(() => import('../content-types/StoreProductList'));
export const webPageContent = dynamic(() => import('../content-types/webPageContent'));
