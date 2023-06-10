import "./App.css";
// import AppLayout from "./Pages/AppLayout";
import FilterContent from "./Pages/FilterContent";
import Home from "./Pages/Home";
// import Content from './Pages/Content'
// import Navbar from './Pages/Navbar'
// import Background from './Pages/Background'
// import Footer from './Pages/Footer'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from './Pages/Sidebar'
import Navbar from "./Pages/Navbar";
import Content from "./Pages/Content";

const App = () => {
  return (
    <Router>
      <Navbar/>
      <div className="layout">
      <Sidebar />
      {/* <Home /> */}
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
      </Routes>
      {/* <h1>Cotent</h1> */} 
      </div>
    </Router>
  );
};

export default App;
