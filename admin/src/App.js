import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./app.css";
import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import Login from "./pages/login/Login";
import { AuthContext } from "./context/authContext/AuthContext";
import { useContext } from "react";
import ListList from "./pages/listList/ListList";
import List from "./pages/list/List";
import NewList from "./pages/newList/NewList";
import MovieList from "./pages/movieList/MovieList";
import { Movie } from "@mui/icons-material";
import NewMovie from "./pages/newMovie/NewMovie";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
      </Routes>
      <Topbar />
      <div className="container">
        <Sidebar />

        <Routes>
          <Route path="/">
            <Route index element={<Home />} />

            <Route path="/users">
              <Route index element={<UserList />} />
              <Route path=":userId" element={<User />} />
            </Route>

            <Route path="/newUser" element={<NewUser />} />

            <Route path="/movies">
              <Route index element={<MovieList />} />
              <Route path=":movieId" element={<Movie />} />
            </Route>
            <Route path="/newMovie" element={<NewMovie />} />

            <Route path="/lists">
              <Route index element={<ListList />} />
              <Route path=":listId" element={<List />} />
            </Route>

            <Route path="/newlist" element={<NewList />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
