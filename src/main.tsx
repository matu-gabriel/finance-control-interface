import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/index.tsx";
import GlobalStyle from "./styles/globalStyle.ts";
import { AppProvider } from "./hooks";

createRoot(document.getElementById("root")!).render(
  <>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
    <GlobalStyle />
  </>
);
