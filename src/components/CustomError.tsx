// Dependencies
import Head from 'next/head'

const defaultMessages = {
  400: 'Bad Request',
  404: 'This page could not be found',
  405: 'Method Not Allowed',
  500: 'Internal Server Error',
}

export type CustomErrorProps = Omit<Error, 'name'> & {
  statusCode: 400 | 404 | 405 | 500
}

export const CustomError = ({
  statusCode,
  message,
}: CustomErrorProps): JSX.Element => {
  const displayMessage = message || defaultMessages[statusCode]

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
        <meta content="initial-scale=1.0, width=device-width" name="viewport" />
      </Head>
      {statusCode && <h3>{statusCode}</h3>}
      {displayMessage && <p>{displayMessage}</p>}
    </>
  )
}

export default CustomError
