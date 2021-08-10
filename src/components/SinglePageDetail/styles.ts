// Dependencies
import styled from 'styled-components'

export const DetailContainer = styled.div`
  width: 50%;

  .title {
    margin-bottom: 0;
  }

  .title,
  .date {
    display: block;
    text-align: center;
  }

  .date {
    margin-top: -0.5rem;
    color: #444;
  }
  .content {
    margin-top: 1rem;
  }

  .image {
    width: 100%;
    height: 400px;
    position: relative;
    margin: 0 auto 2rem;

    img {
      object-fit: cover;
    }
  }
`
