import { useEffect, useState } from "react";
import { Expense } from "../model/Expense";
import { getExpensesByExpenseId } from "../service/getExpenses";

const useExpenseByExpenseId = (expenseId :string) =>{
    const [expense,setExpense] = useState<Expense | undefined>();
    const [errors,setError]      =useState<string>("");
    const [isLoading,setLoaders] =useState<Boolean>(false);
  
    useEffect(() => {
      setLoaders(true)
      if (expenseId) {
        getExpensesByExpenseId(expenseId)
          .then((response) => setExpense(response.data))
          .catch((error) => {setError(error.message)
            console.log(error)
          })
          .finally(() => setLoaders(false));
      }
    }, []);
    return {
        expense,
        errors,
        isLoading
}
}
export default useExpenseByExpenseId;