import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react"; // for storing expensive computation in cache
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";


function App() {
  const mode = useSelector((state) => state.mode); // grabs the value in initial state -> redux
  // if you wanna grab information from the store -> 
  // just use useSelector, grab the state in the correct reducer 
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token)); // but where on earth is the token??????isAuth

  return (
    <div className="app">
      <BrowserRouter>
      {/* BrowserRouter -> so we can use and setup our routes */}
        <ThemeProvider theme={theme}>
          {/* this is CSS reset for material UI */}
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              // element={isAuth ? <HomePage /> : <HomePage />}
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
