import { ThemeProvider } from "./context/ThemeContext";
import AppRouter from "./routes/Router";

function App() {
  return (
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;

