import { useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import useFirestoreCollection from "../../hooks/useFirestoreCollection";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectFade,
  Thumbs,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";

const ResellItemDetails = () => {
  const params = useParams();
  const resellDataCollection = useFirestoreCollection("resells");

  SwiperCore.use([Autoplay, Navigation, Pagination]);

  const filteredItem = resellDataCollection.data.filter(
    (item) => item.id === params.id
  );

  return (
    <>
      {resellDataCollection.isLoading ? (
        <Loader />
      ) : (
        <div className="resellDetails">
          {filteredItem.map((data) => {
            return (
              <div className="details-container" key={data.id}>
                <div className="main-details">
                  <Swiper
                    slidesPerView={1}
                    navigation
                    pagination={{ type: "bullets" }}
                    effect="fade"
                    modules={[EffectFade, Thumbs]}
                    autoplay={{ delay: 3000 }}
                  >
                    {data.imgUrls.map((url, index) => (
                      <SwiperSlide key={index}>
                        <div className="image-swiper">
                          <img src={data.imgUrls[index]} alt={data.itemName} />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  <div className="key-details">
                    <h3 className="heading">Key Information</h3>

                    <ul className="details-list">
                      <h4 className="name">{data.itemName}</h4>
                      <li>
                        <h5>Item Price</h5>
                        <span>
                          {data.price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          ৳
                        </span>
                      </li>

                      <li>
                        <h5>Brand</h5>
                        <span>{data.brand}</span>
                      </li>

                      <li>
                        <h5>Warranty Left</h5>
                        <span>
                          {data.warrantyLeft === "lifetime" ? (
                            <p>Lifetime</p>
                          ) : (
                            <p>
                              {data.warrantyLeft} year
                              {data.warrantyLeft > 1 ? "s" : ""}
                            </p>
                          )}
                        </span>
                      </li>

                      <li>
                        <h5>Seller Contact:</h5>
                        <span>{data.sellerContact}</span>
                      </li>

                      <li>
                        <h5>Seller Email:</h5>
                        <span>{data.sellerEmail}</span>
                      </li>
                    </ul>

                    <button className="buyItem">Buy</button>
                  </div>
                </div>

                <div className="specifications">
                  <h6>Specifications of the Item</h6>
                  <ul className="specifications-list">
                    {data.detailsInputFields.map((details, index) => (
                      <li key={index}>
                        <span>{details.nameOfTheDetail}</span>
                        <span>{details.detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ResellItemDetails;
