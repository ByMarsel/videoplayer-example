import styled from "styled-components";

export const StyledPlayer = styled.video`
  width: 100%;
  background-color: black;
`;

export const StyledContainer = styled.div`
  position: relative;

  max-width: fit-content;

  max-width: 1000px;
`;

export const StyledControls = styled.div<{ isIOS?: boolean }>`
  position: absolute;
  bottom: 0;

  width: 100%;

  color: white;

  display: grid;

  grid-template-columns: ${({ isIOS }) =>
    isIOS ? "min-content 8fr 40px" : "min-content 8fr 1fr 40px"};
  grid-column-gap: 10px;

  padding: 12px;

  box-sizing: border-box;
  z-index: 5;

  @media (max-width: 640px) {
    grid-template-columns: ${({ isIOS }) =>
      isIOS ? "min-content 8fr 40px" : "min-content 8fr 60px 40px"};
    grid-column-gap: 4px;
  }
`;

export const PlayPauseButton = styled.button`
  border-radius: 4px;
  border: 0;
  padding: 4px 8px;

  box-sizing: border-box;

  color: white;

  min-width: 50px;

  background-color: rgba(64, 64, 64, 0.7);

  cursor: pointer;

  min-height: 28px;

  @media (max-width: 640px) {
    padding: 4px 2px;
  }
`;

export const ProgressAndTimerContainer = styled.div`
  display: flex;

  background-color: rgba(64, 64, 64, 0.7);

  padding: 4px 8px;
  padding-left: 0;

  border-radius: 4px;
`;

export const FullscreenButton = styled(PlayPauseButton)`
  padding: 0;
  min-width: initial;
`;

export const FirstPlayOverlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 10;

  background-color: black;

  display: flex;

  align-items: center;
  justify-content: center;

  font-size: 50px;

  cursor: pointer;
`;

export const FirstPlayButton = styled.button`
  font-size: 50px;
  background-color: white;
  outline: 0;
  color: black;
  padding: 12px 16px;

  border-radius: 2px;

  cursor: pointer;

  border: none;

  @media (max-width: 640px) {
    padding: 8px 12px;

    font-size: 20px;
  }
`;
