import styled from "styled-components";
import { theme } from "../../styles/theme";
import { InputNumberFormat } from "@react-input/number-format";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background-color: ${theme.colors.dark};
  padding: 1.5rem;

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  footer {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  > label {
    color: ${theme.colors.white};
    font-size: 0.625rem;
  }

  select {
    height: 2.25rem;
    border-radius: 0.25rem;
    padding: 0 0.75rem;
    background-color: ${theme.colors.black};
    color: ${theme.colors.light};
    border: 1px solid transparent;
    transition: all 100ms;
    outline: none;

    &:focus {
      border-color: ${theme.colors.success};
    }
  }
`;

export const CurrencyInput = styled(InputNumberFormat)`
  height: 2.25rem;
  background-color: ${theme.colors.black};
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
`;

export const RadioForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const RadioGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  input {
    cursor: pointer;
    width: 1rem;
    height: 1rem;
    accent-color: ${theme.colors.success};
  }

  label {
    color: ${theme.colors.white};
    font-size: 0.875rem;
  }
`;

export const ErrorMessage = styled.span`
  margin-top: 0.125rem;
  font-size: 0.625rem;
  line-height: 80%;
  color: ${theme.colors.error};
`;
