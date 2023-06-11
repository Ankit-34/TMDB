import React from "react";
import { useNavigate } from "react-router-dom";
import "../Style/Card.css";

type CardType = {
  type: string;
  filterType: string | undefined;
  id: number;
  poster: string;
  name: string | undefined;
  release_date: string | undefined;
  popularity: number;
};

const poster_url = "https://image.tmdb.org/t/p/w200/";
const Card: React.FC<CardType> = ({ type, filterType, id, poster, name, release_date }) => {
  const navigate = useNavigate();

  const openCard = () => {
    console.log("Hii");
    navigate(`/${type}/${filterType}/${id}`);
  };

  return (
    <div className="card_container">
      <img src={`${poster_url}${poster}`} onClick={openCard} alt="" />
      <div className="details">
        <div className="release_date">{release_date}</div>
        <p className="name" onClick={openCard}>
          {name}
        </p>
      </div>
    </div>
  );
};

export default Card;
