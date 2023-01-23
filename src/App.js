import { Routes, Route, Navigate } from "react-router-dom";

import { useAuth } from "./contexts/AuthContext";

import Home from "./pages/Home";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";

const App = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={currentUser ? <Home /> : <Navigate to="/login" />}
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
    </div>
  );
};

export default App;
