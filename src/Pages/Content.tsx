import { useState, useEffect } from "react";
import {useParams} from 'react-router-dom';
import Card from './Card'
import "../Style/Content.css";
import axios from "axios";

const base_url = "https://api.themoviedb.org/3";

type FilterTypes = {
  typeProp : string;
  filterProp? : string;
}

type DataType_movie = {
  id: number;
  title?: string;
  overview: string;
  popularity: number;
  vote_average: number;
  release_date?: string;
  poster_path: string;
  name?: string;
  first_air_date?: string;
};


const options = {
  headers: {
    accept: "application/json",
    Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MWMzN2VlNTRiYmNmY2U2MDY2OWFjZmFlYjVjZTNkZiIsInN1YiI6IjY0N2YxNDkxY2FlZjJkMDBmY2U3MmRkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WfTUPM11W-F5QGcWlTHije4-1SyFtWQJrbPymZDcfLw",
  },
};

const Content : React.FC<FilterTypes> = ({typeProp, filterProp}) => {
  let type, filter;
  const {filter_param} = useParams();
  const param = useParams();
  console.log("Params : " , param);
  const [dataSource, setDataSource] = useState<DataType_movie[]>([]);
  console.log(typeProp, filterProp);
  
  const fetchData = async () => {

      filter = filterProp || filter_param ;
      type = typeProp ;
       let URL = "";

      if(filterProp==='trending')
        URL =  `${base_url}/${filter}/${type}/week`; 
      else URL =  `${base_url}/${type}/${filter}`;   
        
    try {
    console.log("fetching for : ", URL);
      const res = await axios.get(URL, options);    
      console.log(res.data);
      setDataSource([...res.data.results]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <div className="content">
      {
        (filterProp === 'trending') ? 
        <div className="type">Trending {typeProp.charAt(0).toUpperCase() + typeProp.slice(1)} Shows This Week </div>
        :
        <div className="type">
          {filter} {type}
        </div>
      }
      <div className="movies">
          {dataSource.map((data) => {
            return (
              <div className="card_wrapper">
                <Card poster={data.poster_path}
                type={typeProp}
                filterType={filterProp}
                id={data.id}
                name={(data?.title) ? data.title : data.name} release_date={(data?.release_date) ? data.release_date : data.first_air_date}
                popularity={data.popularity}/>
              </div>
            );
          })}
        </div> 
    </div>
  );
};

export default Content;
