import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "./components/global/store.jsx";
import Theme from "./components/layout/Theme.jsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <ThemeProvider theme={Theme}>
        <CssBaseline/>
        <App />
      </ThemeProvider>
    </Provider>
  </QueryClientProvider>
);
