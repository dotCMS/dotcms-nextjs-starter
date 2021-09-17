// Dependencies
import * as React from 'react'
import { clsx } from '@/utils'

// TODO: add correct types with GraphQL-Codegen
export type ColumnProps = {
  className?: string
  leftOffset: number
  width: number
}

export const Column: React.FC<ColumnProps> = ({
  children,
  className,
  leftOffset,
  width,
}) => {
  const end = leftOffset + width

  return (
    <div className={clsx(`col-start-${leftOffset} col-end-${end}`, className)}>
      {children}
    </div>
  )
}

export default Column
