// Internals
import ColumnContainer from './ColumnContainer'

/**
 * Calculate the offset for the column container
 *
 * @param prev The previous column container
 * @param col The column container
 */
export const calcColumnOffset = (prev: any, col: any) => {
  return prev
    ? col.left - (prev.width + prev.left)
    : col.left > 0
    ? col.left
    : null
}

/**
 * Get the width offset for the column container
 *
 * @param row The row container
 */
export const getColumnsWithOffset = (row: any) => {
  return row.columns.reduce((acc, col) => {
    const prev = acc[acc.length - 1] || null

    return acc.concat([
      {
        ...col,
        offset: calcColumnOffset(prev, col),
      },
    ])
  }, [])
}

export type RowContainerProps = {
  // TODO: add correct types with GraphQL-Codegen
  row: any
}

export const RowContainer = ({ row }: RowContainerProps) => {
  const cols = getColumnsWithOffset(row)

  return (
    <div className="container">
      <div className="row">
        {cols.map((col, k) => (
          <ColumnContainer {...col} key={k} />
        ))}
      </div>
    </div>
  )
}

export default RowContainer
