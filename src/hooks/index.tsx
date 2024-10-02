import { ReactNode } from "react";
import { FetchAPIProvider } from "./useFetchAPI";
import { AuthProvider } from "./AuthContext";

type AppProviderProps = {
  children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  return (
    <AuthProvider>
      <FetchAPIProvider>{children}</FetchAPIProvider>
    </AuthProvider>
  );
}
