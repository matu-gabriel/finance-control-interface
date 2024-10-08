import styled from "styled-components";

export const DropDownContainer = styled.div`
  position: relative;
  display: inline-block;
`;
export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #fff; /* Cor do ícone */
  padding: 0.5rem;

  &:hover {
    color: #ddd; /* Cor ao passar o mouse */
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%; /* Para posicionar abaixo do botão */
  right: 0;
  background-color: #fff;
  border: 1px solid #ddd;
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
    background-color: #f0f0f0;
  }
`;
