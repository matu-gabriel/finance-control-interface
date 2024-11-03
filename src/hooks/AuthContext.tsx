import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type UserType = {
  id: string;
  name: string;
  email: string;
  token: string;
  picture?: string; // A URL da foto de perfil é opcional
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: UserType | null;
  login: (email: string, password: string) => Promise<void>;
  googleLogin: (googleToken: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

type AuthPrioviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthPrioviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const userData = localStorage.getItem("userData");
    return !!userData;
  });

  const [user, setUser] = useState<UserType | null>(() => {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  });

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/session`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Erro no login");
    }

    const data = await response.json();

    // Armazena o token JWT no localStorage para futuras requisições
    localStorage.setItem("userData", JSON.stringify(data));

    // Atualiza o estado para indicar que o usuário está autenticado
    setIsAuthenticated(true);
    setUser(data);
  };

  const logout = async () => {
    await localStorage.removeItem("userData");
    setIsAuthenticated(false);
    setUser(null);
  };

  const googleLogin = async (googleToken: string) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/session-google`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: googleToken }),
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao logar com Google");
    }

    const data = await response.json();

    // Armazena o token JWT no localStorage para futuras requisições
    localStorage.setItem("userData", JSON.stringify(data));

    // Atualiza o estado para indicar que o usuário está autenticado
    setIsAuthenticated(true);
    setUser(data);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, googleLogin, logout, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
