import Error from '../components/layout/Error';

function ErrorPage({ message, statusCode }) {
    return <Error message={message} statusCode={statusCode} />;
}

export default ErrorPage;
