import { Envelope, Lock, User } from "@phosphor-icons/react";
import { Input } from "../../components/input";
import { Title } from "../../components/title";
import { Container, Link } from "./style";
import { Button } from "../../components/button";
import { useForm } from "react-hook-form";
import { CreateUserData } from "../../validators/types";
import { useNavigate } from "react-router-dom";
import { APIService } from "../../services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../../validators/schemas";
import { useEffect } from "react";
import { useAuth } from "../../hooks/AuthContext";

export function Register() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserData>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (data: CreateUserData) => {
    try {
      await APIService.register(data);
      navigate("/login");
    } catch (error) {
      console.error("Erro no registro:", error);
      alert("Erro no registro. Verifique os dados e tente novamente.");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Container>
      <Title
        title="Criar conta"
        subtitle="Por favor insira seu nome, e-mail e uma senha"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="Username"
          icon={<User size={24} />}
          {...register("name")}
        />
        {errors.name && <p>{errors.name.message}</p>}
        <Input
          type="email"
          placeholder="Email"
          icon={<Envelope size={24} />}
          {...register("email")}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <Input
          type="password"
          placeholder="Password"
          icon={<Lock size={24} />}
          {...register("password_hash")}
        />
        {errors.password_hash && <p>{errors.password_hash.message}</p>}
        <Input
          type="password"
          placeholder="Confirm password"
          icon={<Lock size={24} />}
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        <Button variant="outline" style={{ marginBottom: ".7rem" }}>
          Cadastrar
        </Button>
      </form>
      <p>
        Possui conta? Clique <Link to="/login">Aqui</Link>
      </p>
    </Container>
  );
}
