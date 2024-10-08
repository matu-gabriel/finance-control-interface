/* eslint-disable @typescript-eslint/no-unused-vars */
import { Lock, User } from "@phosphor-icons/react";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { Title } from "../../components/title";
import { Container, ContainerForm, GoogleButtonContainer, Link } from "./style";
import Logo from "../../assets/logoLogin.png";
import { useForm } from "react-hook-form";
import { LoginUserData } from "../../validators/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../validators/schemas";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

export function Login() {
  const { login, isAuthenticated, googleLogin } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserData>({
    resolver: zodResolver(loginSchema),
  });

  // Função para o login do Google
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleGoogleLogin = async (response: any) => {
    const token = response.credential;
    if (!token) {
      console.error("Token is undefined");
      return;
    }
    try {
      await googleLogin(token);
      navigate("/");
    } catch (error) {
      setError("Erro ao fazer login com o Google.");
      console.error(error);
    }
  };

  // Função chamada no submit do formulario
  const onSubmit = async (data: LoginUserData) => {
    try {
      await login(data.email, data.password);
      navigate("/");
    } catch (err) {
      setError("Credenciais inválidas");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Container>
      <img src={Logo} alt="Logo" style={{ height: "220px" }} />
      <ContainerForm>
        <Title
          title="Login"
          subtitle="Por favor entre com seu e-mail e senha"
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
          <Button variant="outline" style={{ marginBottom: "0.7rem" }}>
            Entrar
          </Button>
        </form>

        <GoogleButtonContainer>
          <GoogleLogin
            text="signup_with"
            size="medium"
            onSuccess={handleGoogleLogin}
            onError={() => setError("Erro ao fazer login no google")}
          />
        </GoogleButtonContainer>
        <p>
          Não possui conta? Clique <Link to="/register">Aqui</Link>
        </p>
      </ContainerForm>
    </Container>
  );
}
