import styled from "styled-components";
import { theme } from "../../styles/theme";

type ContentType = {
  $variant: "receita" | "despesa";
  $tagColor: string;
};

const variantColorMap = {
  receita: theme.colors.success,
  despesa: theme.colors.error,
};

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  position: relative;
  padding: 0.75rem 0;
  cursor: pointer;

  span {
    font-size: 0.75rem;
    font-weight: 300;
    color: ${theme.colors.white};
    line-height: 110%;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    height: 1px;
    width: 5%;
    background-color: ${theme.colors.light};
  }
`;

export const Info = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;

    strong {
      font-size: 1rem;
      font-weight: 500;
      color: ${theme.colors.white};
    }

    span {
      font-size: 0.875;
      font-weight: 400;
      color: ${theme.colors.light};
    }
  }
`;

export const Content = styled.div<ContentType>`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;

  strong {
    font-size: 0.875rem;
    font-weight: 700;
    color: ${(props) => variantColorMap[props.$variant]};
  }

  span {
    font-size: 0.625rem;
    font-weight: 400;
    border: 1px solid ${(props) => props.$tagColor};
    color: ${(props) => props.$tagColor};
    padding: 0.25rem;
    border-radius: 0.125rem;
  }
`;
