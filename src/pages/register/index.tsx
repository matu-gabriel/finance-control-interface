import { Envelope, Lock, User } from "@phosphor-icons/react";
import { Input } from "../../components/input";
import { Title } from "../../components/title";
import { Container, Link } from "./style";
import { Button } from "../../components/button";

export function Register() {
  return (
    <Container>
      <Title
        title="Register"
        subtitle="Please enter your Name, Login and your Password"
      />
      <form>
        <Input type="text" placeholder="Username" icon={<User size={24} />} />
        <Input type="email" placeholder="Email" icon={<Envelope size={24} />} />
        <Input
          type="password"
          placeholder="Password"
          icon={<Lock size={24} />}
        />
        <Input
          type="password"
          placeholder="Confirm password"
          icon={<Lock size={24} />}
        />
        <Button variant="outline">Register</Button>
      </form>
      <p>
        Possui conta? Clique <Link to="/cadastro">Aqui</Link>
      </p>
    </Container>
  );
}
