import ShopByCategory from "./ShopByCategory";
import "./home.scss";

const Home = () => {
  return (
    <>
      <div className="home">
        <div className="home-container">
          <div className="heading-1">
            <h2>Shop by category</h2>
          </div>
          <ShopByCategory />
          <div className="heading-2">
            <h2>Intel Custom Build</h2>
          </div>
          <div className="heading-3">
            <h2>Ryzen Custom Build</h2>
          </div>
          <div className="heading-4">
            <h2>Popular Items</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
