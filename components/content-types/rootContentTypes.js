import dynamic from 'next/dynamic';
export const Banner = dynamic(() => import('../content-types/Banner'));
export const SimpleWidget = dynamic(() => import('../content-types/SimpleWidget'));
export const StoreProductList = dynamic(() => import('../content-types/StoreProductList'));
export const webPageContent = dynamic(() => import('../content-types/webPageContent'));
export const ProductDetail = dynamic(() => import('./ProductDetail'));
export const CategoryFilter = dynamic(() => import('../content-types/CategoryFilter'));
