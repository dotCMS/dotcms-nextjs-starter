// Dependencies
import styled from "styled-components";

// Spacing
// $spacing-0: 0;
// $spacing-1: 0.5rem;
// $spacing-2: 0.75rem;
// $spacing-3: 1rem;
// $spacing-4: 1.5rem;
// $spacing-5: 2rem;
// $spacing-6: 2.5rem;
// $spacing-7: 3rem;
// $spacing-8: 4rem;
// $spacing-9: 4.5rem;

export const DetailContainer = styled.div`
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

  dot-contentlet-thumbnail {
    align-items: center;
    display: block;
    position: relative;
    width: 94px;
    height: 94px;
  }

  .state {
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
`;
