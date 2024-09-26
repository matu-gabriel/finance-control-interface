import { Lock, User } from "@phosphor-icons/react";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { Title } from "../../components/title";
import { Container, ContainerForm, Link } from "./style";
import Logo from "../../assets/logoLogin.png";

export function Login() {
  return (
    <Container>
      <img src={Logo} alt="" />
      <ContainerForm>
        <Title
          title="Login"
          subtitle="Please enter your Login and your Password"
        />
        <form>
          <Input type="text" placeholder="Email" icon={<User size={24} />} />
          <Input
            type="password"
            placeholder="Senha"
            icon={<Lock size={24} />}
          />
          <Button variant="outline">Entrar</Button>
        </form>
        <p>
          Não possui conta? Clique <Link to="/cadastro">Aqui</Link>
        </p>
      </ContainerForm>
    </Container>
  );
}
