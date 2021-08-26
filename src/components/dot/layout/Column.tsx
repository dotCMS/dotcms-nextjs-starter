// Dependencies
import * as React from 'react'

// TODO: add correct types with GraphQL-Codegen
export type ColumnProps = any

export const Column: React.FC<ColumnProps> = (props) => {
  const {
    md: { size: colSize, offset },
  } = props
  return (
    <div className={`col-md-${colSize} offset-md-${offset}`}>
      {props.children}
    </div>
  )
}

export default Column
