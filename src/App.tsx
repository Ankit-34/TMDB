import "./App.css";
import FilterContent from "./Pages/FilterContent";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from './Pages/Sidebar'
import Navbar from "./Pages/Navbar";
import Detail from "./Pages/Detail";
import Search from "./Pages/Serach";

const App = () => {
  return (
    <Router>
      <Navbar/>
      <div className="layout">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/movie/:filter_param"
          element={
            <FilterContent typeProp="movie" />
          }
          ></Route>
        <Route
          path="/tv/:filter_param"
          element={
              <FilterContent typeProp="tv" />
          }
        ></Route>
        <Route
          path="/:type/:filterType/:id"
          element={
              <Detail />
          }
        ></Route>
        <Route
          path="/search"
          element={
              <Search />
          }
        ></Route>
      </Routes>
      </div>
    </Router>
  );
};

export default App;
