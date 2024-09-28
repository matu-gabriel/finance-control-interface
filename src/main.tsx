import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/index.tsx";
import GlobalStyle from "./styles/globalStyle.ts";
import { AuthProvider } from "./hooks/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    <GlobalStyle />
  </>
);
