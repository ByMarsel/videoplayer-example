import { createGlobalStyle } from "styled-components";
import { Player } from "./components/player/Player";
import { Container, GitHubLink, GitHubLinkWrapper, Title } from "./App.styles";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "Pixelify Sans";
    src: url("/videoplayer-example/static/PixelifySans-Regular.ttf");
    font-weight: 400;
  }

  * {
    font-family: 'Pixelify Sans';
    font-weight: 400;
  }

  body, html {
    padding: 0;
    margin: 0;
  }
`;

function App() {
  return (
    <Container>
      <GlobalStyle />
      <Title>Welcome to Our Video Player Example</Title>
      <Player src="https://storage.googleapis.com/my-bucket-9999991/drift_video.mp4" />
      <GitHubLinkWrapper>
        See code on {" "}
        <GitHubLink href="https://github.com/ByMarsel/videoplayer-example">
          GitHub Repo
        </GitHubLink>
      </GitHubLinkWrapper>
    </Container>
  );
}

export default App;
