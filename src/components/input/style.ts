import styled, { css } from "styled-components";
import { theme } from "../../styles/theme";

type ContainerProps = {
  $variant: "black" | "dark";
  hasIcon: boolean;
};

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  gap: 0.125;
  width: 100%;

  svg {
    ${(props) =>
      props.hasIcon &&
      css`
        color: ${theme.colors.success};
      `}
  }

  label {
    color: ${theme.colors.white};
    font-size: 0.75rem;
  }

  input {
    height: ${(props) => (props.hasIcon ? "3rem" : "2.25rem")};
    background-color: ${(props) => theme.colors[props.$variant]};
    outline: none;
    border-radius: 0.25rem;
    padding: 0 ${(props) => (props.hasIcon ? "2.5rem" : "0.75rem")};
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

export const IconWrapper = styled.div`
  position: absolute;
  left: 10px;
  display: flex;
  align-items: center;
  pointer-events: none;
  color: #888;
`;
