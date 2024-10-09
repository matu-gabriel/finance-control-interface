import { ErrorContainer, ErrorMessage, ErrorTitle, LinkHome } from "./style";

export function ErrorPage() {
  return (
    <ErrorContainer>
      <ErrorTitle>404 - Página não encontrada</ErrorTitle>
      <ErrorMessage>
        A página que você está tentando acessar não existe
      </ErrorMessage>
      <LinkHome to="/">Voltar para página inicial</LinkHome>
    </ErrorContainer>
  );
}
