// src/globalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
  }

  body {
    background: #f5f5f5;
    color: #2d545e;
    font-family: Arial, sans-serif;
    line-height: 1.6;
  }
`;

export default GlobalStyle;
