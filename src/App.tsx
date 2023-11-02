import { createGlobalStyle } from "styled-components";
import { Player } from "./components/player/Player";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "Pixelify Sans";
    src: url("/static/PixelifySans-Regular.ttf");
    font-weight: 400;
  }

  * {
    font-family: 'Pixelify Sans';
    font-weight: 400;
  }
`;

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Player />
    </div>
  );
}

export default App;
