import styled from "styled-components";
import { theme } from "../../styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;

  h2 {
    font-size: 1.26rem;
    color: ${theme.colors.white};
    font-weight: 700;
  }

  span {
    font-size: 0.9rem;
    color: ${theme.colors.light};
    font-weight: 400;
  }
`;
