import { Link } from "react-router-dom";
import "./resell.scss";
import useFirestoreCollection from "../../hooks/useFirestoreCollection";
import Loader from "../../components/loader/Loader";

const Resell = () => {
  const resellDataCollection = useFirestoreCollection("resells");

  return (
    <>
      {resellDataCollection.isLoading && <Loader />}
      <div className="resell">
        <div className="titleAndSellBtn">
          <h1>Resells</h1>
          <span>used items being sold by our customers</span>
          <Link to="sellProductUpload">
            <button className="resellBtn">Sell an item</button>
          </Link>
        </div>

        <div className="resell-container">
          {resellDataCollection.data.map((data) => (
            <Link key={data.id} to={`resellItemDetail/${data.id}`}>
              <div className="image">
                <img src={data.imgUrls[0]} alt={data.itemName} />
              </div>

              <div className="content">
                <div className="itemTitle">
                  <h4>{data.whatProduct.replace(/-/g, " ")}</h4>
                  <p>{data.itemName}</p>
                </div>

                <div className="warranty">
                  <h4>Warranty Left</h4>
                  <div>
                    {data.warrantyLeft === "lifetime" ? (
                      <p>Lifetime</p>
                    ) : (
                      <p>
                        {data.warrantyLeft} year
                        {data.warrantyLeft > 1 ? "s" : ""}
                      </p>
                    )}
                  </div>
                </div>

                <div className="price">
                  <h4>Price</h4>
                  <p>
                    {data.price
                      .toString()
                      .replace(/(\d)(?=(\d{2})+\d$)/g, "$1,")}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Resell;
