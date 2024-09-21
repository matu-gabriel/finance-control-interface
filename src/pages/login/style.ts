import styled from "styled-components";
import { theme } from "../../styles/theme";
import { Link as LinkReact } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 1rem;
  justify-content: center;
  margin: 20% auto;
  max-width: 45%;
  background-color: ${theme.colors.dark};
  border-radius: 0.25rem;

  form {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  input {
    padding: 1rem;
    height: 3rem;
  }

  p {
    color: ${theme.colors.light};
    margin: 1rem 0;
  }
`;

export const Link = styled(LinkReact)`
  text-decoration: none;
`;
