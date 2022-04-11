import React from 'react'
import DotThumbnail from '../dotContent/DotThumbnail'
import { DetailContainer } from './styles'
import Link from '../../../Link'
import { StoryNode } from '../type'
// Internals

const imageStyle = {
  width: '94px',
  height: '94px',
  position: 'relative' as any,
}

export const DotContent: any = ({ attrs: { data } }: StoryNode<any>) => {
  const { language, contentType, title, urlMap } = data
  return (
    <DetailContainer>
      <div className="card">
        <div className="card-header">
          {/* TODO: Remove this style */}
          <div style={imageStyle}>
            <DotThumbnail {...data} />
          </div>
        </div>

        <div className="card-body">
          <div>
            <div className="card-title">
              <h3>
                <Link href={urlMap}>{title}</Link>
              </h3>
            </div>
            <div className="card-subtitle">
              <span>{contentType}</span>
            </div>
          </div>

          {/* TODO: Make this a Component */}
          <div>
            <div className="state">
              {/* <dot-state-icon [state]="data | contentletState" size="16px"> */}
              {/* </dot-state-icon> */}
              <div className="badge">
                <span>{language}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DetailContainer>
  )
}

export default DotContent
