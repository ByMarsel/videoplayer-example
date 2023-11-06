import styled from "styled-components";

export const StripValue = styled.div`
  width: 0%;
  height: 4px;
  border-radius: 1px;
  background-color: white;
  overflow: hidden;
  cursor: pointer;
  z-index: 1;
  transition: transform ease-out 200ms;
`;

export const StripValuePlaceholder = styled.div`
  height: 4px;
  border-radius: 1px;
  background-color: gray;
  position: absolute;
  z-index: 0;
  width: calc(100% - 16px);
  cursor: pointer;
  transition: transform ease-out 200ms;

`;

export const StripValueWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-shrink: 1;
  padding: 0 8px;
  width: 100%;
  position: relative;

  &:hover {
    ${StripValuePlaceholder} {
      transform: scaleY(2);
    }

    ${StripValue} {
      transform: scaleY(2);
    }
  }
`;
