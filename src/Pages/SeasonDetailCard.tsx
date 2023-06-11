import React from "react";
import '../Style/SeasonDetailCard.css'

type SeasonDetailType = {
  id: number;
  name: string;
  air_date: string;
  episode_count: number;
  poster_path: string;
  season_number: number;
};

const SeasonDetailCard: React.FC<SeasonDetailType> = (prop) => {
    const {id, name, air_date, episode_count, poster_path, season_number} = prop;
  return <div className="sdetailcard">
    <p>Name : {name}</p>
    <p>Air Date : {air_date}</p>
    <p>Episode Count : {episode_count}</p>
    <p>Season Number : {season_number}</p>
  </div>;
};

export default SeasonDetailCard;
