import CustomError from '../components/dotcms/layout/CustomError';

function Error({ statusCode, err }) {
    return <CustomError message={err.message} statusCode={statusCode} stack={err.traceError} />;
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode, err };
};
export default Error;
