import styled from "styled-components";

export const StyledPlayer = styled.video``;

export const StyledContainer = styled.div`
  position: relative;

  max-width: fit-content;
`;

export const StyledControls = styled.div`
  position: absolute;
  bottom: 0;

  width: 100%;

  color: white;

  display: grid;

  grid-template-columns: min-content 1fr;
  grid-column-gap: 10px;

  padding: 12px;

  box-sizing: border-box;
`;

export const PlayPauseButton = styled.button`
  border-radius: 4px;
  border: 0;
  padding: 4px 8px;
  padding-bottom: 6px;

  box-sizing: border-box;

  color: white;

  min-width: 60px;

  background-color: rgba(64, 64, 64, 0.7);

  cursor: pointer;
`;

export const ProgressAndTimerContainer = styled.div`
  display: flex;

  background-color: rgba(64, 64, 64, 0.7);

  padding: 4px 8px;

  border-radius: 4px;
`;
