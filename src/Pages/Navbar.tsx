import { SearchBar } from 'antd-mobile';
import '../Style/Navbar.css'
import {useNavigate} from 'react-router-dom'; 

const Navbar = () => {
    const navigate = useNavigate();
    return <>   
        <div className='Outer'>
            <div className="logo" onClick={()=>navigate('/')}>MoviesEra</div>
            <div className='adjust'>
                <SearchBar 
                    className="search_bar"
                    placeholder="Search"
                    onSearch={(search) => {
                        console.log(search);
                        navigate(`/search?query=${search}&page=1`);
                    }}
                    onClear={()=>navigate('/')}
                    // onClear={}
                />
            </div>
        </div>
    </>
}

export default Navbar;