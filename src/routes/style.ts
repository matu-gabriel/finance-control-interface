import { Link } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../styles/theme";

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: ${theme.colors.white};
`;

export const ErrorTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

export const ErrorMessage = styled.p`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

export const LinkHome = styled(Link)`
  text-decoration: none;
  font-size: 1.2rem;
  color: ${theme.colors.info};
  &:hover {
    text-decoration: underline;
  }
`;
