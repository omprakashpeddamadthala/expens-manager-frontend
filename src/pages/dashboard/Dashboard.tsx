import ExpenseList from "../../components/ExpenseList";
import useExpenses from "../../hooks/useExpenses";


const Dashboard = () => {
 const {expenses,error,isLoading} =useExpenses();
  return (
    <div>
      {error && <p>Error: {error}</p>}
      {isLoading && <p>status: {isLoading}</p>}
      <ExpenseList expenses={expenses} />
    </div>
  );
};

export default Dashboard;
