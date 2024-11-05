import { createGlobalStyle } from "styled-components";
import { theme } from "./theme";
import "react-toastify/dist/ReactToastify.css";

const GlobalStyle = createGlobalStyle`
    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    }

    body {
        background-color: ${theme.colors.black};
    }

    body, input, button, select {
        font: 1rem "Nunito", sans-serif;
    }

    h1, h2, p, span, button, label, input {
        line-height: 100%;
    }

    #root {
        max-width: 1280px;
        margin: 0 auto;
    }

    button, a {
        cursor: pointer;
    }

    a {
        text-decoration: none;
    }
`;

export default GlobalStyle;
