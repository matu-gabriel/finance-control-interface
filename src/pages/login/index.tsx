import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { Title } from "../../components/title";
import { Container, Link } from "./style";

export function Login() {
  return (
    <Container>
      <Title
        title="Login"
        subtitle="Please enter your Login and your Password"
      />
      <form>
        <Input type="text" placeholder="Email" />
        <Input type="password" placeholder="Senha" />
        <Button variant="outline">Entrar</Button>
      </form>
      <p>
        Não possui conta? Clique <Link to="/cadastro">Aqui</Link>
      </p>
    </Container>
  );
}
