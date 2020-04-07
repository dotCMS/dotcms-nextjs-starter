import fetch from 'node-fetch';
import Head from 'next/head';

import DotCMSPage from '../components/layout/DotCMSPage';
import Layout from '../components/layout/Layout';
import { transformPage } from '../utils/dotcms';

import { PageContext } from '../pages/_app';

function TestingPage({ pageRender, nav }) {
    const isEditMode = pageRender?.viewAs?.mode === 'EDIT_MODE';

    return (
        <PageContext.Provider
            value={{
                isEditMode,
                nav: nav || [],
                language: {
                    current: '1',
                    set: () => {}
                }
            }}
        >
            <Head>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <script src="https://unpkg.com/current-device/umd/current-device.min.js"></script>
                <title>{`${pageRender?.page?.title} | ${pageRender?.page?.friendlyName}`}</title>
            </Head>
            {pageRender ? (
                <Layout {...pageRender?.layout}>
                    <DotCMSPage body={pageRender?.layout?.body} />
                </Layout>
            ) : null}
        </PageContext.Provider>
    );
}

export async function getStaticProps({ params }) {
    try {
        const headers = {
            headers: {
                Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhcGkxODg5YzcyNi01MjAxLTQxOTAtYTE5Ny1lNDhiNDQ2MDNlNWYiLCJ4bW9kIjoxNTg2MTg2NjA4MDAwLCJuYmYiOjE1ODYxODY2MDgsImlzcyI6ImIyY2UwMjQ2LWEyODctNGE5Yi04OTA1LWUzY2VhMzhkODMyYyIsImV4cCI6MTU4NzA1MDYwOCwiaWF0IjoxNTg2MTg2NjA4LCJqdGkiOiIxZTgxYTk4Ny1lOTNiLTRjMWYtYjQ1Ni1jZWM1NzBlZGZmZTAifQ.RDweP2l-zhCOKzPJBl8Qa5FxVluOAH8-oDC7GmUT8Ys`,
                'Content-type': 'application/json'
            }
        };
        const pageRender = await fetch(
            `https://starter.dotcms.com/api/v1/page/json/${params.slug.join('/')}`,
            headers
        )
            .then((res) => res.json())
            .then((res) => res.entity);

        const nav = await fetch(`https://starter.dotcms.com/api/v1/nav//?depth=2`, headers)
            .then((res) => res.json())
            .then((res) => res.entity.children);
        return {
            props: {
                pageRender: await transformPage(pageRender),
                nav: nav
            }
        };
    } catch (e) {
        return {
            props: {
                page: {
                    title: 'Error'
                }
            }
        };
    }
}

export async function getStaticPaths() {
    let data = await fetch(
        'https://starter.dotcms.com/api/content/render/false/query/-contentType:forms%20+contentType:htmlpageasset%20+(conhost:48190c8c-42c4-46af-8d1a-0cd5db894797%20conhost:SYSTEM_HOST)%20+languageId:1%20+deleted:false%20+working:true/orderby/modDate%20desc'
    )
        .then((res) => res.json())
        .then(({ contentlets }) =>
            contentlets.map(({ path }) => {
                return {
                    params: {
                        slug: path.split('/').filter((partial) => !!partial)
                    }
                };
            })
        );

    return {
        paths: data,
        fallback: true
    };
}

export default TestingPage;
