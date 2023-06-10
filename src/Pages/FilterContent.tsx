import { useState, useEffect } from "react";
import {useParams} from 'react-router-dom';
import Card from './Card'
import "../Style/FilterContent.css";
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

const FilterContent : React.FC<FilterTypes> = ({typeProp}) => {
  let type, filter;
  const {filter_param} = useParams();
//   const param = useParams();
//   console.log("Params : " , param);
  const [dataSource, setDataSource] = useState<DataType_movie[]>([]);
//   console.log(typeProp, filter_param);
  
  const fetchData = async () => {

      filter = filter_param ;
      type = typeProp ;

        console.log("Ya!!");
       const URL =  `${base_url}/${type}/${filter}`; 
        
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
  }, [filter_param]);
  
  // str.charAt(0).toUpperCase() + str.slice(1)
  return (
    <div className="f_content">
        <div className="type">
        {typeProp.charAt(0).toUpperCase() + typeProp.slice(1)} {filter_param} Shows
        </div>
      <div className="f_movies">
          {dataSource.map((data) => {
            return (
              <div className="f_card_wrapper">
                <Card poster={data.poster_path}
                name={(data?.title) ? data.title : data.name} release_date={(data?.release_date) ? data.release_date : data.first_air_date}
                popularity={data.popularity}/>
              </div>
            );
          })}
        </div> 
    </div>
  );
};

export default FilterContent;
