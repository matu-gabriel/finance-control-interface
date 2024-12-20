import styled from "styled-components";
import { theme } from "../../styles/theme";

type ViewProps = {
  $viewMode: "grid" | "list";
  $isSingle?: boolean;
};

type ContainerProps = {
  $isActive: boolean;
};

export const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${theme.colors.black};
`;

export const Sidebar = styled.aside`
  width: 16rem;
  background-color: ${theme.colors.dark};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const SidebarHeader = styled.div`
  padding: 1rem;
  h1 {
    font-size: 1.5rem;
    font-weight: bold;
    color: ${theme.colors.white};
  }
`;
export const SidebarNav = styled.nav`
  margin-top: 1rem;
`;

export const SidebarButton = styled.button<ContainerProps>`
  display: flex;
  align-items: center;
  width: 100%;
  border: none;
  margin: 1rem 0;
  padding: 0.75rem 1.5rem;
  text-align: left;
  color: ${(props) => (props.$isActive ? theme.colors.black : "#4B5563")};
  background-color: ${(props) => (props.$isActive ? "#EFF6FF" : "transparent")};
  border-right: ${(props) => (props.$isActive ? "4px solid #2563EB" : "none")};

  &:hover {
    background-color: #f3f4f6;
  }

  svg {
    margin-right: 0.75rem;
  }
`;

export const MainContent = styled.main`
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h2 {
    color: ${theme.colors.white};
  }
`;

export const InputGroup = styled.div`
  display: flex;
  align-items: flex-end;
  max-width: 22.5rem;
  width: 100%;
  gap: 0.5rem;
`;

export const ViewModeButton = styled.button<ContainerProps>`
  padding: 0.7rem;
  border: none;
  margin: 0 0.5rem;
  border-radius: 0.375rem;
  background-color: ${(props) =>
    props.$isActive ? theme.colors.primary_dark : "transparent"};
  color: ${(props) => (props.$isActive ? theme.colors.success : "#4B5563")};
`;

export const ContentContainer = styled.div<ViewProps>`
  display: ${(props) => (props.$viewMode === "grid" ? "grid" : "block")};
  gap: ${(props) => (props.$viewMode === "grid" ? "1.5rem" : "0")};
  grid-template-columns: ${(props) =>
    props.$viewMode === "grid"
      ? "repeat(auto-fit, minmax(16rem, 1fr))"
      : "none"};
`;

export const Card = styled.div<ViewProps>`
  background-color: ${theme.colors.light};
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  display: ${(props) => (props.$viewMode === "list" ? "flex" : "block")};
  justify-content: ${(props) =>
    props.$viewMode === "list" ? "space-between" : "none"};
  align-items: ${(props) => (props.$viewMode === "list" ? "center" : "none")};
  margin: ${(props) => (props.$viewMode === "list" ? "1rem 0" : "none")};
  width: ${(props) =>
    props.$isSingle && props.$viewMode === "grid" ? "30%" : "100%"};
`;

export const CardContent = styled.div`
  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: ${theme.colors.black};
  }

  p {
    padding: 0.75rem 0;
    font-size: 1rem;
    color: #6b7280;
  }
`;

export const ActionsContainer = styled.div`
  display: flex;
  gap: 0.5rem;

  button {
    padding: 0.5rem;
    border-radius: 0.375rem;
    color: #4b5563;
    border: none;
    background-color: transparent;

    &:hover {
      color: #2563eb;
    }
  }

  .delete {
    &:hover {
      color: #dc2626;
    }
  }
`;
