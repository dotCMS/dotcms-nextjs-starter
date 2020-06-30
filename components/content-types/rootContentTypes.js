import dynamic from 'next/dynamic';
export const Banner = dynamic(() => import('../content-types/Banner'));
export const SimpleWidget = dynamic(() => import('../content-types/SimpleWidget'));
export const StoreProductList = dynamic(() => import('../content-types/StoreProductList'));
export const webPageContent = dynamic(() => import('../content-types/webPageContent'));
export const ProductSingle = dynamic(() => import('../content-types/ProductSingle'));
export const CategoryFilter = dynamic(() => import('../content-types/CategoryFilter'));