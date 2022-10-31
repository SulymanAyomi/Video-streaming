import "./app.scss";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import Login from "./pages/login/Login";
import { Route, Navigate, BrowserRouter, Routes } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./authContext/AuthContext";
import Movie from "./pages/movie/Movie";

const App = () => {
  const { user } = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/register" />;
    }

    return children;
  };
  const UnProtectedRoute = ({ children }) => {
    if (user) {
      return <Navigate to="/" />;
    }

    return children;
  };
  return (
    <BrowserRouter basename="coolstream">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <UnProtectedRoute>
              <Register />
            </UnProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <UnProtectedRoute>
              <Login />
            </UnProtectedRoute>
          }
        />
        <>
          <Route
            path="/movies"
            element={
              <ProtectedRoute>
                <Home type="movie" />
              </ProtectedRoute>
            }
          />

          <Route
            path="/series"
            element={
              <ProtectedRoute>
                <Home type="series" />
              </ProtectedRoute>
            }
          />

          <Route
            path="/watch"
            element={
              <ProtectedRoute>
                <Watch />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movie"
            element={
              <ProtectedRoute>
                <Movie />
              </ProtectedRoute>
            }
          />
        </>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
