import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: #fafafa;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 14px Helvetica, Arial, sans-serif;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button, a {
    cursor: pointer
  }
`;
