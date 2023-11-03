import styled from "styled-components";

export const ProgressWrapper = styled.div`
  box-sizing: border-box;

  display: flex;

  align-items: center;

  flex-shrink: 1;

  padding-right: 8px;

  width: 100%;

  position: relative;
`;

export const ProgressBar = styled.div`
  width: 0%;
  height: 4px;
  border-radius: 1px;
  background-color: white;

  z-index: 1;
`;

export const ProgressPlaceholder = styled.div`
  height: 4px;
  border-radius: 1px;
  background-color: gray;
  position: absolute;
  z-index: 0;
  width: calc(100% - 8px);
`;