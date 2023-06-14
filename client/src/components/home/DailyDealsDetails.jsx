import { useParams } from "react-router-dom";
import useFirestoreCollection from "../../hooks/useFirestoreCollection";

const DailyDealsDetails = () => {
  const dealParam = useParams();

  const dealsDataCollection = useFirestoreCollection("dailyDeals");

  const filteredDeal = dealsDataCollection.data.filter(
    (data) => data.id === dealParam.id
  );

  return <div className="dealDetails">Hi</div>;
};

export default DailyDealsDetails;
