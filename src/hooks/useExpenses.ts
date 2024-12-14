
import { useEffect, useState } from "react";
import { Expense } from "../model/Expense";
import { getExpenses } from "../service/getExpenses";


const useExpenses = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [error, setError] = useState(null);
    const [isLoading, setLoders] = useState(false);
    useEffect(() => {
      setLoders(true);
      getExpenses()
        .then((response) => {
          setExpenses(response.data);
        })
        .catch((error) => setError(error.message))
        .finally(() => setLoders(false));
    }, []);
  return{expenses,error,isLoading}
}

export default useExpenses;