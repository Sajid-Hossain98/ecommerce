import { Link } from "react-router-dom";
import "./resell.scss";

const Resell = () => {
  return (
    <div className="resell">
      <Link to="sellProductUpload">sell a product</Link>
    </div>
  );
};

export default Resell;
