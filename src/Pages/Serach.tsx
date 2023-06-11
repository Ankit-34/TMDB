import React, {useState, useEffect} from 'react'
import { Pagination } from 'antd';
import axios from 'axios';
import '../Style/Search.css'
import {useSearchParams} from 'react-router-dom';
import SearchCard from './SearchCard';

type DataSourceType = {
    id : number;
    title : string;
    name : string;
    overview : string;
    poster_path : string;
    media_type : string;
    popularity : number;
}

const options = {
    headers: {
      accept: "application/json",
      Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MWMzN2VlNTRiYmNmY2U2MDY2OWFjZmFlYjVjZTNkZiIsInN1YiI6IjY0N2YxNDkxY2FlZjJkMDBmY2U3MmRkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WfTUPM11W-F5QGcWlTHije4-1SyFtWQJrbPymZDcfLw",
    },
  };
  

const Serach = () => {
    const [params, setParams] = useSearchParams();
    const [dataSource, setDataSource] = useState<DataSourceType[]>([]);
    const page = params.get('page');
    const query = params.get('query');
    const [total, setTotal] = useState<number>(1);
    console.log("Params : ", params.get('query'));

    const fetchData = async (page = params.get('page')) => {
        const base_url = "https://api.themoviedb.org/3/search/multi";
        const URL = `${base_url}?query=${query}&page=${page}`;

        try{
            console.log("fetching for : ", URL);
            const res = await axios.get(URL, options);    
            console.log(res.data.results);
            setTotal(res.data.total_results);
            setDataSource([...res.data.results]);
        }
        catch(e){
            console.log(e);
        }
    }

    useEffect(()=>{
        fetchData();
    }, [page, query]);

  return (
    <div className='search'>
        <p className='title_search'>Search Results : </p>
        {
            dataSource.map((data)=>{
                return <SearchCard {...data}/>
            })
        }
        <div className='paginition'>
            <Pagination
            total={total}
            pageSize={20} 
            showSizeChanger={false}
            onChange={(page)=>{
                setParams((param) => {
                    param.set("page", JSON.parse(page.toString() || "1"));
                    return params;
                });
                fetchData();
            }}
            className='paginition'/>
        </div>
    </div>
  )
}

export default Serach