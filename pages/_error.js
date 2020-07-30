import Error from '../components/dotcms/layout/ErrorPage';

function ErrorPage({ error }) {
    return <Error message={error.message} statusCode={error.statusCode} stack={error.traceError} />;
}

ErrorPage.getInitialProps = async ({ query: { customError }, res: { statusCode } }) => {
    // Custom DotCMS error
    if (customError) {
        return { error: customError };
    }

    // Error from NextJS static file page render
    if (statusCode !== 200) {
        return {
            error: {
                statusCode
            }
        };
    }

    return {
        error: {
            statusCode: 404
        }
    };
};

export default ErrorPage;
