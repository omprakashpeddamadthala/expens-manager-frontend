import { Expense } from "../model/Expense";
interface Props {
  expenses: Expense[];
}

const ExpenseList = ({ expenses }: Props) => {
  return (
    <div className="card">
      <h5 className="card-header">
        Expense
        <span className="float-end">Amout</span>
      </h5>
      <div className="card-body">
        {expenses.map((expense) => (
          <div>
            <div className="d-flex justify-content-between bordr-bottom-1 p-3 text-dark">

              <div className="card-title m-0">
                <h5>{expense.name}</h5>
                <span className="fst-italic">{expense.date.toString()}</span>
              </div>

              <div className="card-subtitle">
                <span className="badge round-pill app-primary-bg-color">
                  {expense.amount}
                </span>
              </div>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
