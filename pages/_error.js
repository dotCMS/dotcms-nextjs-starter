import Error from '../components/layout/Error';

function ErrorPage(error) {
    return <Error message={error.message} statusCode={error.statusCode} stack={error.traceError} />;
}

export default ErrorPage;
