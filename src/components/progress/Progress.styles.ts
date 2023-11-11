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

export const FramePreview = styled.video`
  width: 100px;
  position: absolute;
  bottom: 24px;

  background-color: lightgray;

  border: 1px solid lightgray;
  box-sizing: border-box;

  left: 0;

  display: block;

  overflow: hidden;
  border-radius: 4px;

  z-index: -1000;

  padding: 0;
  margin: 0;

`
