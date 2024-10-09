import styled from "styled-components";
import { theme } from "../../styles/theme";

export const DropDownContainer = styled.div`
  position: relative;
  display: inline-block;
`;
export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${theme.colors.white};
  padding: 0.5rem;

  &:hover {
    color: ${theme.colors.light};
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.light};
  border-radius: 0.25rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  z-index: 10;
  padding: 0.5rem 1rem;
`;

export const DropdownItem = styled.div`
  padding: 0.5rem 1rem;
  cursor: pointer;
  color: #333;

  &:hover {
    background-color: ${theme.colors.white};
  }
`;
