// Dependencies
import * as React from 'react'

// TODO: add correct types with GraphQL-Codegen
export type ColumnProps = {
  leftOffset: number
  width: number
}

export const Column: React.FC<ColumnProps> = ({
  children,
  leftOffset,
  width,
}) => {
  const end = leftOffset + width

  return (
    <div className={`col-start-${leftOffset} col-end-${end}`}>{children}</div>
  )
}

export default Column
