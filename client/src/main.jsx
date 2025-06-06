import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { appStore } from "./app/store";
import { Toaster } from "sonner";
import Custom from "./components/Custom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={appStore}>
     <Custom>
     <>
     <App />
     <Toaster />
     </>
     </Custom>
    </Provider>
  </StrictMode>
);
