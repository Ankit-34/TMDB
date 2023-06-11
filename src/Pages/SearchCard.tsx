import React from "react";
import {useNavigate} from 'react-router-dom'
import "../Style/SearchCard.css";

type DataType = {
  id: number;
  title: string;
  name: string;
  overview: string;
  poster_path: string;
  media_type: string;
  popularity: number;
};

const poster_url = "https://image.tmdb.org/t/p/original";

const SearchCard: React.FC<DataType> = ({
  id,
  title,
  name,
  overview,
  poster_path,
  media_type,
  popularity,
}) => {

    const navigate = useNavigate();
    const openDetail = () => {
        navigate(`/${media_type}/search/${id}`);
    }

  return (
    <div className="search_card">
      <div className="search_card_poster" onClick={openDetail}>
        <img src={poster_url + `/${poster_path}`} alt="poster" />
      </div>
      <div className="search_card_detail">
        <div>
          <label>Name : </label>
          <p>{name || title}</p>
        </div>
        <div>
          <label>Media Type : </label>
          <p>{media_type}</p>
        </div>
        <div>
          <label>Popularity : </label>
          <p>{popularity}</p>
        </div>
        <div className="overview_outer">
          <label>Overview : </label>
          <p className="overview_searchCard">{overview || "-"}</p>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
