/* eslint-disable @typescript-eslint/no-unused-vars */
import { Lock, User } from "@phosphor-icons/react";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { Title } from "../../components/title";
import { Container, ContainerForm, Link } from "./style";
import Logo from "../../assets/logoLogin.png";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginUserData } from "../../validators/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserData>({});

  // Função chamada no submit do formulario
  const onSubmit = async (data: LoginUserData) => {
    try {
      await login(data.email, data.password);
      navigate("/");
    } catch (err) {
      setError("Credenciais inválidas");
    }
  };

  return (
    <Container>
      <img src={Logo} alt="Logo" style={{ height: "300px" }} />
      <ContainerForm>
        <Title
          title="Login"
          subtitle="Please enter your Login and your Password"
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            placeholder="Email"
            icon={<User size={24} />}
            {...register("email")}
          />
          {errors.email && <p>{errors.email.message}</p>}
          <Input
            type="password"
            placeholder="Senha"
            icon={<Lock size={24} />}
            {...register("password")}
          />
          {errors.password && <p>{errors.password.message}</p>}

          {error && <p>{error}</p>}
          <Button variant="outline">Entrar</Button>
        </form>
        <p>
          Não possui conta? Clique <Link to="/cadastro">Aqui</Link>
        </p>
      </ContainerForm>
    </Container>
  );
}
