import React from 'react'
import DotThumbnail from './DotThumbnail'
import Link from '../../../Link'
import { StoryNode } from '../type'

// Styles
import { DotContentContainer, DotState } from './styles'

export const DotContent: any = ({ attrs: { data } }: StoryNode<any>) => {
  const { language, contentType, title, urlMap } = data
  const state = getState(data)

  return (
    <DotContentContainer>
      <div className="card">
        <div className="card-header">
          <div className="card-img">
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

          <div className="card-footer">
            <DotState state={state} />
            <div className="badge">
              <span>{language}</span>
            </div>
          </div>
        </div>
      </div>
    </DotContentContainer>
  )
}

const getState = ({ live, archived, working, hasLiveVersion }): string => {
  if (archived) {
    return 'archived'
  }

  if (live && hasLiveVersion && working) {
    return 'published'
  }

  if (hasLiveVersion) {
    return 'revision'
  }

  return 'draft'
}

export default DotContent
