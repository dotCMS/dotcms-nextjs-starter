import Link from 'next/link';

export default function ProductLine({ productLine, children }) {
    return (
        <>
            <h2 className="pt-5">
                <Link href={productLine.url.replace('/index', '')}>
                    <a>{productLine.title}</a>
                </Link>
            </h2>
            {children}
        </>
    );
}
