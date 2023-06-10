import Content from "./Content";
import "../Style/Home.css";
// import Footer from "./Footer";

const Home = () => {
  return (
    <div className="home">
        <div className="displayImg">
          <img src="https://images-na.ssl-images-amazon.com/images/S/pv-target-images/5f9285ac004740ddf9255dc2dd0def6e9a3688b4b46fa63222dd2261cfc62922._UY500_UX667_RI_TTW_.jpg"></img>
        </div>
        <Content typeProp="movie" filterProp="trending" />
        <Content typeProp="tv" filterProp="trending" />
    </div>
  );
};

export default Home;
