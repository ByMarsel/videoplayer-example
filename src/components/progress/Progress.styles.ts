import styled from "styled-components";

export const ProgressBar = styled.div`
  width: 0%;
  height: 4px;
  border-radius: 1px;
  background-color: white;

  overflow: hidden;

  cursor: pointer;
  z-index: 1;

  transition: transform ease-out 200ms;
`;

export const ProgressPlaceholder = styled.div`
  height: 4px;
  border-radius: 1px;
  background-color: gray;
  position: absolute;
  z-index: 0;
  width: calc(100% - 8px);

  cursor: pointer;

  transition: transform ease-out 200ms;

`;

export const ProgressWrapper = styled.div`
  box-sizing: border-box;

  display: flex;

  align-items: center;

  // it's bad practise
  flex-shrink: 1;

  padding-right: 8px;

  width: 100%;

  position: relative;

  &:hover {
    ${ProgressPlaceholder} {
      transform: scaleY(2);
    }

    ${ProgressBar} {
      transform: scaleY(2);
    }
  }
`;
