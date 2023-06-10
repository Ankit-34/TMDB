import React from "react";
// import 
import '../Style/Card.css'

type CardType = {
  poster: string;
  name: string | undefined;
  release_date: string | undefined;
  popularity: number;
};

const openCard = () => {
    console.log("Hii");
}

const poster_url = "https://image.tmdb.org/t/p/w200/";
const Card: React.FC<CardType> = ({ poster, name, release_date, popularity }) => {
  return (
    <div className="card_container">
      <img src={`${poster_url}${poster}`} onClick={openCard} alt="" />
      <div className="details">
        <div className="release_date" onClick={openCard}>{release_date}</div>
        <p className="name" onClick={openCard}>{name}</p>
      </div>
    </div>
  );
};

export default Card;
