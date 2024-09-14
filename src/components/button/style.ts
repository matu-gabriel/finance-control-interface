import styled, { css } from "styled-components";
import { theme } from "../../styles/theme";

type ContainerProps = {
  $variant: "default" | "outline";
};

export const Container = styled.button<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  border-radius: 0.25rem;
  background-color: ${(props) =>
    props.$variant === "default" ? theme.colors.success : "transparent"};
  color: ${(props) =>
    props.$variant === "default" ? theme.colors.black : theme.colors.success};
  border: 0;
  padding: 0 0.75rem;
  transition: all 100ms;
  font-weight: 700;
  font-size: 1.2rem;

  ${(props) =>
    props.$variant === "outline" &&
    css`
      border: 1px solid ${theme.colors.success};
    `}

  &:hover {
    background-color: ${theme.colors.primary_dark};
  }
`;
