
const Dashboard = () => {
  const expenses =[
    {
      id: 1,
      name: 'Groceries',
      amount: 100.00,
      date: new Date().toDateString()
    },
    {
        id: 2,
        name: 'Water Bill',
        amount: 200.00,
        date: new Date().toDateString()
    },

    {
        id: 3,
        name: 'Eletricity Bill',
        amount: 225.80,
        date: new Date().toDateString()
    },
    {
        id: 4,
        name: 'Rent',
        amount: 550.00,
        date: new Date().toDateString()
    }
  ]
  return <div>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Amount</th>
                <th>Date</th>
            </tr>
        </thead>
        <tbody>
            {expenses.map(expense =>
            <tr key={expense.id}>
                <td>{expense.name}</td>
                <td>{expense.amount}</td>
                <td>{expense.date}</td>
            </tr>
            )}
        </tbody>
    </table>
  </div>
}

export default Dashboard
