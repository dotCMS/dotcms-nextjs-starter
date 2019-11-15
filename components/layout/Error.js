import Head from 'next/head';

const defaultMessages = {
    400: 'Bad Request',
    404: 'This page could not be found',
    405: 'Method Not Allowed',
    500: 'Internal Server Error'
};

function Error({ statusCode, message, stack }) {
    const displayMessage = message || defaultMessages[statusCode];
    console.error(stack)

    return (
        <>
            <style global jsx>
                {`
                    body,
                    html {
                        width: 100%;
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                `}
            </style>
            <Head>
                <title>{`${statusCode} | ${displayMessage}`}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <h3>{statusCode}</h3>
            <p>{displayMessage}</p>
        </>
    );
}

export default Error;
