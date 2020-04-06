import Head from 'next/head';
import DotCMSPage from '../../components/layout/DotCMSPage';
import Layout from '../../components/layout/Layout';

import dotCMSApi from '../../utils/dotcms/dotcmsApi';
import { getPage } from '../../utils/dotcms';

function TestingPage({page}) {
    console.log('page', page)
    return (
        <>
            <Head>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <script src="https://unpkg.com/current-device/umd/current-device.min.js"></script>
                {/* <title>{`${page.title} | ${page.friendlyName}`}</title> */}
            </Head>
            <h1>Title: {page && page.title}</h1>
            {/* <Layout {...pageRender.layout}>
                <DotCMSPage body={pageRender.layout.body} />
            </Layout> */}
        </>
    );
}

export async function getStaticProps({ params }) {
    console.log('getStaticProps', params);
    return {
        props: {
            page: {
                title: 'Hola Mundo',
                friendlyName: 'Hello World'
            }
        }
    };
    // try {
    //     const pageRender = await getPage(params.slug);
    //     return pageRender;
    // } catch {
    //     return {
    //         error: {
    //             statusCode: 404
    //         }
    //     };
    // }
}

export async function getStaticPaths() {
    console.log(getStaticPaths);

    // const data = await dotCMSApi.esSearch
    //     .search({
    //         contentType: 'htmlpageasset',
    //         queryParams: {
    //             languageId: '1'
    //         }
    //     })
    //     .then(({ contentlets }) =>
    //         contentlets.map(({ path }) => {
    //             return {
    //                 slug: path
    //             };
    //         })
    //     );
    return {
        paths: [
            { params: { slug: 'hola' } }
        ],
        fallback: true
    };
}

export default TestingPage;
