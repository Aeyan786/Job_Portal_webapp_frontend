import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import store from "./Redux/Store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const persister = persistStore(store);

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persister}>
          <App />
        </PersistGate>
      </Provider>
      <Toaster richColors position="top-center" />
    </StrictMode>
  </BrowserRouter>
);
