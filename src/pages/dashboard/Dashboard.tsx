import ExpenseList from "../../components/ExpenseList";
import useExpenses from "../../hooks/useExpenses";
import { Expense } from "../../model/Expense";
import DashBoardStatus from "./DashboardStatus";



const Dashboard = () => {

 const loggedInUser :string ="Omprakashornold@gmail.com";
 const {expenses,error,isLoading} =useExpenses();
 const totalExpenses  = expenses.reduce((acc:number, expense: Expense)=>acc + expense.amount,0);
  return (
    <div className="container">
      {error && <p>Error: {error}</p>}
      {isLoading && <p>status: {isLoading}</p>}

      <DashBoardStatus loggedInUser={loggedInUser} totalExpenses={totalExpenses}/>
      <hr></hr>
      <ExpenseList expenses={expenses} />
    </div>
  );
};

export default Dashboard;
