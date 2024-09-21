import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/index.tsx";
import GlobalStyle from "./styles/globalStyle.ts";

createRoot(document.getElementById("root")!).render(
  <>
    <RouterProvider router={router} />
    <GlobalStyle />
  </>
);
