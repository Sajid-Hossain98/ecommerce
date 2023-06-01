import { MdDeleteOutline } from "react-icons/md";
import { GiEmptyHourglass } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  resetCart,
  selectCartProducts,
} from "../../redux/slice/cartSlice";
import { selectIsLoggedIn } from "../../redux/slice/authSlice";
import { Link } from "react-router-dom";
import { BiLogInCircle } from "react-icons/bi";

const Cart = () => {
  const cartProducts = useSelector(selectCartProducts);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const dispatch = useDispatch();

  return (
    <>
      {isLoggedIn ? (
        <div className="cart-container">
          <h4>Products in your cart</h4>

          {cartProducts && cartProducts.length > 0 ? (
            cartProducts.map((product, index) => (
              <div className="contentAndDeleteBtn" key={index}>
                <div className="cartContent">
                  <div className="image">
                    <img src={product.img} alt={product.title} />
                  </div>

                  <div className="details">
                    <h3 className="product-title">{product.title}</h3>
                    <p className="brand">{product.brand}</p>
                    <p className="quantityPrice">
                      {product.quantity} x {product.price} ={" "}
                      {product.quantity * product.price}
                    </p>
                  </div>
                </div>

                <div className="deleteBtn">
                  <button onClick={() => dispatch(removeFromCart(product.id))}>
                    <MdDeleteOutline
                      style={{ color: "#fa6969", fontSize: "25px" }}
                    />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <h6 className="ifNoProduct">
              <GiEmptyHourglass style={{ fontSize: "45px" }} />
              Products you add to your cart will be listed here!
            </h6>
          )}
          <div className="orderAndResetBtn">
            <div className="order">
              <button>Order Now</button>
            </div>
            <div className="resetCart">
              <button className="reset" onClick={() => dispatch(resetCart())}>
                Reset Cart
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="notLoggedInCart">
          <span className="notLogged">You are not logged in!</span>
          <i>
            <BiLogInCircle />
          </i>
          <div className="loginPls">
            Please
            <Link to="/login" className="loginForCart">
              login
            </Link>
            to access your cart items.
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
