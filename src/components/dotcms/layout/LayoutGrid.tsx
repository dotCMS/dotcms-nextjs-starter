// Dependencies
import * as React from 'react'

// Internals
import { PageContext } from '@/contexts'
import RowContainer from './RowContainer'

export const LayoutGrid = () => {
  const {
    // @ts-ignore TODO: we need to type the contexts
    pageRender: {
      layout: { body },
    },
  } = React.useContext(PageContext)

  return body && body.rows ? (
    body.rows.map((row, i) => (
      <section
        className={`section ${row.styleClass || ''}`}
        id={`section-${i + 1}`}
        key={i}
      >
        <RowContainer row={row} />
      </section>
    ))
  ) : (
    <h1> Layout not found </h1>
  )
}

export default LayoutGrid
