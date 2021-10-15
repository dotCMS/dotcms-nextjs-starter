// Dependencies
import * as React from 'react'

// Internals
import { PageContext } from '@/contexts'
import Column from './Column'
import Contentlet from './Contentlet'
import Row from './Row'
import { ContentletWrapper, ContainerWrapper } from './Container'

function getFullContainer({ container, containerStructures }: { [key: string]: any }, uuid: string) {

  const acceptTypes = containerStructures
    .map((structure: Record<string, string>) => structure.contentTypeVar)
    .join(',');

  return {
    ...container,
    acceptTypes,
    uuid
  }
}

export const LayoutGrid = () => {
  const {
    // @ts-ignore TODO: we need to type the contexts
    pageRender: {
      layout: { body },
      containers,
    },
    isEditMode
  } = React.useContext(PageContext)

  if (!body.rows.length) {
    return <h1>Layout not found</h1>
  }

  const containersData = containers

  return body.rows.map(({ columns }, i) => (
    /**
     * We loop through the rows, containers and contentlets
     */
    <Row key={`row-${i}`}>
      {columns.map(({ leftOffset, width, containers }, k) => (
        /**
         * - We loop through the columns and render the containers
         * - We use the leftOffset to calculate the offset of the column
         * - We use the width to calculate the width of the column
         */
        <Column key={`col-${k}`} leftOffset={leftOffset} width={width}>
          {containers.map((container) => {
            const { identifier, uuid } = container;
            /**
             * - We use the uuid to find the contentlets in the containers
             */
            const contentlets =
              containersData[identifier].contentlets[`uuid-${uuid}`]

            const fullContainer = getFullContainer(containersData[identifier], uuid);

            return (
              <ContainerWrapper container={fullContainer} isEditMode={isEditMode} key={identifier}>
                {contentlets.map((contentlet) => {
                  /**
                   * - We loop through the contentlets and render the contentlet
                   */
                  return (
                    <ContentletWrapper
                      contentlet={contentlet}
                      isEditMode={isEditMode}
                      key={contentlet.identifier}
                    >
                      <Contentlet data={contentlet} />
                    </ContentletWrapper>
                  )
                })}
              </ContainerWrapper>
            )
          })}
        </Column>
      ))}
    </Row>
  ))
}

export default LayoutGrid
