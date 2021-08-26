// Internals
import ContentletContainer from './Container'
import Column from './Column'

export type ColumnContainerProps = {
  width: number
  offset: number
  styleClass?: string
  containers?: any[]
}

export const ColumnContainer = ({
  width,
  offset,
  styleClass,
  containers,
}: ColumnContainerProps) => {
  return (
    <Column className={styleClass} md={{ size: width, offset: offset }}>
      {containers?.map((container) => (
        <ContentletContainer container={container} key={container.identifier} />
      ))}
    </Column>
  )
}

export default ColumnContainer
