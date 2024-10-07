import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/index.tsx";
import GlobalStyle from "./styles/globalStyle.ts";
import { AppProvider } from "./hooks";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")!).render(
  <>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
      <GlobalStyle />
    </GoogleOAuthProvider>
  </>
);
