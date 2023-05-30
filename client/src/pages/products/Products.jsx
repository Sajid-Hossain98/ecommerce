import "./products.scss";
import { Link, useParams, useSearchParams } from "react-router-dom";
import useFirestoreCollection from "../../hooks/useFirestoreCollection";
import { brands } from "../../assets/brands";
import Loader from "../../components/loader/Loader";

const Products = () => {
  const params = useParams();

  const [searchParams] = useSearchParams();

  const brandFilter = searchParams.get("brand");

  const productCollection = useFirestoreCollection("products");

  //filtering only those brands that match with the current product brands which we are getting through useParams()
  const filteredBrands = brands.filter((brand) => {
    return (
      brand.brandsFor.replace(/\s+/g, "-").toLowerCase() === params.whatProduct
    );
  });

  const filteredProducts = productCollection.data?.filter(
    (data) => data.whatProduct === params.whatProduct
  );

  //here we are filtering products based on the brand that has been chosen by by the user in the product page.
  const productsFilteredByBrand = brandFilter
    ? filteredProducts?.filter(
        (product) =>
          product.brand.replace(/\s+/g, "-").toLowerCase() === brandFilter
      )
    : filteredProducts;

  return (
    <>
      {productCollection.isLoading && <Loader />}

      <div className="products">
        <div className="products-container">
          <h2 className="heading">{params.whatProduct.replace(/-/g, " ")}</h2>

          <p>Filter by brands</p>
          {filteredBrands.map((brands, index) => (
            <div key={index} className="brands">
              {brands.brands.map((brand, i) => (
                <Link
                  to={`?brand=${brand.name.replace(/\s+/g, "-").toLowerCase()}`}
                  key={i}
                >
                  {brand.name}
                </Link>
              ))}
              {brandFilter ? (
                <Link to="." className="clearBtn">
                  Clear Filter
                </Link>
              ) : null}
            </div>
          ))}

          <div className="products-list">
            {productCollection.isError ? (
              <div>{productCollection.isError}</div>
            ) : (
              productsFilteredByBrand?.map((product) => (
                <Link to={`productDetails/${product.id}`} key={product.id}>
                  <div className="image">
                    <img src={product.imgUrls?.[0]} alt={product.productName} />
                  </div>

                  <div className="content">
                    <h3 className="productName">{product.productName}</h3>
                    <div className="price">
                      <span className="productPrice">
                        {product.productPrice
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        ৳
                      </span>

                      <span className="specialPrice">
                        {product.specialPrice
                          ?.toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        ৳
                      </span>
                    </div>

                    <span className="brandName">{product.brand}</span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
