// A variable to verify if the app is being run in a dev environment
export const isDev = process.env.NODE_ENV !== 'production'

/**
 * A wrapper for console.info that only logs if the logger is in development mode.
 */
export function logInfo(message?: any, ...optionalParams: any[]) {
  if (isDev) {
    console.info(message, ...optionalParams)
  }
}

/**
 * A wrapper for console.error that only logs if the logger is in development mode.
 */
export function logError(message?: any, ...optionalParams: any[]) {
  if (isDev) {
    console.error(message, ...optionalParams)
  }
}

// TODO: make this props with proper types
type LoggerPageRenderProps = {
  layout: any
  urlContentMap: any
}

/**
 * A logger that logs to the console.
 */
export function loggerPageRender({
  layout,
  urlContentMap,
}: LoggerPageRenderProps) {
  const {
    body: { rows },
  } = layout

  urlContentMap && console.table(urlContentMap)

  rows.forEach(({ columns }: { columns: Record<string, any> }) => {
    columns.forEach(
      ({
        containers,
        leftOffset,
        width,
        widthPercent,
        styleClass,
        left,
      }: Record<string, any>) => {
        console.table({
          containers,
          leftOffset,
          width,
          widthPercent,
          styleClass,
          left,
        })
      }
    )
  })
}
