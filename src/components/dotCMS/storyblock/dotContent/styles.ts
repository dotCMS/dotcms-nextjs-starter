// Dependencies
import styled from 'styled-components'

export const DotContentContainer = styled.div`
  display: block;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 1rem;

  .card {
    background: #ffffff;
    border: 1px solid #b3b1b8;
    color: #0a0725;
    display: flex;
  }

  .card-img {
    width: 94px,
    height: 94px,
    position: relative
  }

  .card-header {
    box-sizing: border-box;
    min-width: 110px;
    padding: 0.5rem;
    width: 110px;
  }

  .card-body {
    box-sizing: border-box;
    min-width: 100px;
    padding: 0.5rem;
    padding-right: 1rem;
    flex: 1;
  }

  .card-body .card-content {
    padding: 0;
  }

  .card-content {
    padding: 1rem 0;
  }

  .card-title {
    overflow: hidden;
    width: 100%;
  }

  .card-title h3 {
    font-size: 1.5rem;
    overflow: hidden;
    font-weight: 700;
    margin: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .card-subtitle {
    color: #7e7a86;
    font-size: 0.85rem;
    margin-bottom: 0.8rem;
  }

  .card-footer {
    align-items: center;
    display: flex;

    .badge {
      background-color: transparent;
      border: solid 1px #2f3e6c;
      color: #2f3e6c;
      padding: 0.1em 0.25em 0.15em;
      font-size: 10px;
      text-transform: lowercase;
      border-radius: 2px;
    }

    & > * {
      margin-right: 0.5rem;

      &:last-child {
        margin-right: 0;
      }
    }
  }
`

export const DotState = styled.div<{ state: string }>`
  border-radius: 50%;
  border: solid 2px;
  box-sizing: border-box;
  height: 16px;
  width: 16px;
  background: ${(props) => colors[props.state]};
`

const colors = {
  archived: '#e63946',
  published: '#27b970',
  revision: '#ffb703',
  draft: 'transparent',
}
