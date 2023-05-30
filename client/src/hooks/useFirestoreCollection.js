import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

//this hook is used to collect data from the firebase firestore collection. As this hook takes a parameter named "collectionName", so in whichever component we call this hook to get data from a firebase firestore database, we will have to pass the collection name of the database we want the data from as a string. And from this hook we get "data", "isLoading" and "isError" as we are returning these from this hook.

const useFirestoreCollection = (collectionName) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getCollection() {
      setIsLoading(true);
      try {
        const collectionRef = collection(db, `${collectionName}`);

        // const q = query(collectionRef);

        const querySnap = await getDocs(collectionRef);
        let list = [];
        querySnap.forEach((doc) => {
          return list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
        setIsLoading(false);
      } catch (error) {
        setIsError(error.message);
        setIsLoading(false);
      }
    }

    getCollection();

    return () => {
      getCollection();
    };
  }, [collectionName, db]);

  return { isLoading, isError, data };
};

export default useFirestoreCollection;
