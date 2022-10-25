import { PlayArrow } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import "./movie.scss";
import axios from "axios";

const Movie = () => {
  const location = useLocation();
  const navigate = useNavigate();
  if (!location.state) {
    navigate("/");
  }
  const [movie, setMovie] = useState(location.state);
  const [recom, setRecom] = useState([]);

  useEffect(() => {
    window.title = movie.title;
    if (movie) {
      const getRecommendation = async () => {
        try {
          const genre = movie.genre.join();
          const type = movie.isSeries ? 1 : 0;
          const res = await axios.get(
            "/movies/recommendations?" +
              new URLSearchParams(
                {
                  type: type,
                  genre: genre,
                },
                {
                  headers: {
                    token:
                      "Bearer " +
                      JSON.parse(localStorage.getItem("user")).accessToken,
                  },
                }
              )
          );
          setRecom(res.data.filter((item) => item.id !== movie._id));
        } catch (error) {
          console.log(error);
        }
      };
      getRecommendation();
      return () => {
        setRecom([]);
      };
    }
  }, [movie]);

  const change = (movie) => {
    setMovie(movie);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <div className="movie">
      <Navbar />
      <div className="container">
        <div className="img">
          <img src={movie?.img} alt="" />
          <div className="info">
            <img src={movie?.imgTitle} alt="" />
            <span className="desc">{movie?.desc}</span>
            <div className="itemInfoTop">
              <span>{movie?.duration}</span>
              <span className="limit">+{movie?.limit}</span>
              <span>{movie?.year}</span>
            </div>
            <div className="genre">
              <span>{movie?.genre.join(" | ")}</span>
            </div>
            <button
              className="play"
              onClick={() => navigate("/watch", { state: movie })}
            >
              <PlayArrow />
              <span>Play</span>
            </button>
          </div>
        </div>
        <div className="trailer">
          <h1>Trailer</h1>
          <div className="trailer-video">
            <video src={movie?.video} poster={movie?.imgSm} controls></video>
          </div>
        </div>
        <div className="recom">
          <h1>More like this</h1>
          <div className="recom-container">
            {recom &&
              recom.map((item) => (
                <div
                  className="moviesm"
                  key={item._id}
                  onClick={() => change(item)}
                >
                  <img src={item?.imgSm} alt="" />
                  <p className="movie-title">{item.title}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
