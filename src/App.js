import { Routes, Route, Navigate } from "react-router-dom";

import { TextsProvider } from "./contexts/TextsContext";
import { useAuth } from "./contexts/AuthContext";

import Home from "./pages/Home";
import Texts from "./pages/Texts";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";

import Header from "./components/Header";

const App = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      <Header />
      <TextsProvider>
        <Routes>
          <Route
            path="/"
            element={currentUser ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/texts"
            element={currentUser ? <Texts /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!currentUser ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!currentUser ? <Signup /> : <Navigate to="/" />}
          />
        </Routes>
      </TextsProvider>
    </div>
  );
};

export default App;
