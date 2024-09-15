import styled from "styled-components";
import { theme } from "../../styles/theme";

type ContainerProps = {
  $variant: "black" | "dark";
};

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  gap: 0.125;
  width: 100%;

  label {
    color: ${theme.colors.white};
    font-size: 0.75rem;
  }

  input {
    height: 2.25rem;
    background-color: ${(props) => theme.colors[props.$variant]};
    outline: none;
    border-radius: 0.25rem;
    padding: 0 0.75rem;
    color: ${theme.colors.light};
    font-size: 1rem;
    width: 100%;
    border: 1px solid transparent;
    transition: all 100ms;

    &:focus {
      border-color: ${theme.colors.success};
    }

    &::placeholder {
      color: ${theme.colors.light};
    }
  }
`;
