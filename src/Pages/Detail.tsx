import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../Style/Detail.css";
import SeasonDetailCard from "./SeasonDetailCard";

const base_url = "https://api.themoviedb.org/3";
const options = {
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MWMzN2VlNTRiYmNmY2U2MDY2OWFjZmFlYjVjZTNkZiIsInN1YiI6IjY0N2YxNDkxY2FlZjJkMDBmY2U3MmRkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WfTUPM11W-F5QGcWlTHije4-1SyFtWQJrbPymZDcfLw",
  },
};

type dataSourceType = {
  name: string;
  title: string;
  original_title: string;
  original_name: string;
  tagline: string;
  created_by: creatorType[] | [{ name: "-" }];
  overview: string;
  popularity: number;
  genres: genresType[];
  release_date: string;
  backdrop_path: string;
  status: string;
  runtime: string;
  episode_run_time: number[];
  number_of_seasons: number;
  networks: networsType[] | [{ name: "-" }];
  seasons: seasonType[];
};

type genresType = {
  id: number;
  name: string;
};

type creatorType = {
  name: string;
};

type networsType = {
  logo_path: string;
  name: string;
};

type seasonType = {
  id: number;
  name: string;
  air_date: string;
  episode_count: number;
  poster_path: string;
  season_number: number;
};

const Detail = () => {
  const { type, filterType, id } = useParams();
  const [dataSource, setDataSource] = useState<dataSourceType>();
  const poster_url = "https://image.tmdb.org/t/p/original/";

  const fetchDetail = async () => {
    const URL = base_url + `/${type}/${id}`;

    console.log("Fetching for : ", URL);

    try {
      console.log("fetching for : ", URL);
      const res = await axios.get(URL, options);
      console.log(res.data);
      setDataSource(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDetail();
    window.scrollTo(0, 0);
  }, [type, filterType, id]);

  return (
    <div className="detail">
      <div className="header_wrapper">
        <div className="img_wrapper">
          <img src={`${poster_url}/${dataSource?.backdrop_path}`} alt="lk" />
        </div>
        <div className="d_details">
          <h1>{dataSource?.title || dataSource?.original_name}</h1>
          <div className="d_tagline">{dataSource?.tagline}</div>
          <div className="genres">
            {dataSource?.genres.map((gens) => {
              return <p>{gens.name}</p>;
            })}
          </div>
        </div>
      </div>

      <div className="other_d">
        <div className="desc_d">
          <label>Name</label>
          <p>
            {dataSource?.name || dataSource?.title || dataSource?.original_name}
          </p>
        </div>
        <div className="desc_d">
          <label>Created By</label>
          {dataSource?.created_by
            ? dataSource?.created_by.map((obj) => {
                return <p>{obj.name}</p>;
              })
            : "-"}
        </div>
        <div className="desc_d detail_overview">
          <label>Overview</label>
          <p>{dataSource?.overview}</p>
        </div>
        <div className="desc_d">
          <label>Runtime</label>
          {type === "movies" ? (
            <p>{dataSource?.runtime + " min" || "-"}</p>
          ) : (
            <p>
              {dataSource?.episode_run_time &&
              dataSource?.episode_run_time.length >= 1
                ? dataSource?.episode_run_time[0] + " min"
                : "-"}
            </p>
          )}
        </div>
        <div className="desc_d">
          <label>Status</label>
          <p>{dataSource?.status}</p>
        </div>
        <div className="desc_d">
          <label>Popularity</label>
          <p>{dataSource?.popularity}</p>
        </div>
        <div className="desc_d">
          <label>Release Date</label>
          <p>{dataSource?.release_date}</p>
        </div>
        <div className="desc_d">
          <label>Number of Seasons</label>
          {type === "tv" ? <p>{dataSource?.number_of_seasons}</p> : <p>-</p>}
        </div>
        <div className="desc_d">
          <label>Networks</label>
          {dataSource?.networks
            ? dataSource?.networks.map((obj) => {
                return <p>{obj.name}</p>;
              })
            : "-"}
        </div>
      </div>
      <div className="s_desc_d">
        <label>Seasons</label>
        <div className="seasons">
          {(dataSource?.seasons) ? dataSource?.seasons.map((season) => {
            return <SeasonDetailCard {...season}></SeasonDetailCard>;
          }) : <>-</>}
        </div>
        <div />

      </div>
    </div>
  );
};

export default Detail;

// Detail Page
//         Name    //title
//         Original Title    //original_title
//         Tagline     //tagline
//         Created By  //created_by[]
//         Overview    //overview
//         Popularity  //popularity
//         Genres  //genres[]
//         Release Date    //release_date
//         Poster Path     //poster_path
//         Status  //status
//         Runtime     //runtime - min
//         No. of seasons      //number_of_seasons
//         Seasons     //seasons[]
//         Networks    //networs[]
//         BaseURL : http://image.tmdb.org/t/p/w185/nBNZadXqJSdt05SHLqgT0HuC5Gm.jpg
