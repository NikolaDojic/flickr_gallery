import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    --global-color: #333333;
    --gray: #e7e7e7;
  }

  body {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
  }

  * {
    box-sizing: border-box;
    font-size: 18px;
  }

  main {
    color: var(--global-color);
    height: 100%;
    padding: 5px;
    border: 1px solid black;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  }

  #root {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

`;

export default GlobalStyle;
