function BudgetTable({

                         budgets,
                         onEdit,
                         onDelete

                     }) {

    return (

        <div className="table-responsive">

            <table className="table table-bordered table-hover align-middle">

                <thead className="table-dark">

                <tr>

                    <th>ID</th>

                    <th>Category</th>

                    <th>Monthly Limit</th>

                    <th>Month</th>

                    <th>Year</th>

                    <th>Actions</th>

                </tr>

                </thead>

                <tbody>

                {

                    budgets.length === 0 ?

                        (

                            <tr>

                                <td
                                    colSpan="6"
                                    className="text-center"
                                >

                                    No Budget Found

                                </td>

                            </tr>

                        )

                        :

                        (

                            budgets.map((budget) => (

                                <tr key={budget.id}>

                                    <td>{budget.id}</td>

                                    <td>{budget.category}</td>

                                    <td>₹ {budget.monthlyLimit}</td>

                                    <td>{budget.month}</td>

                                    <td>{budget.year}</td>

                                    <td>

                                        <button

                                            className="btn btn-warning btn-sm me-2"

                                            onClick={() => onEdit(budget)}

                                        >

                                            Edit

                                        </button>

                                        <button

                                            className="btn btn-danger btn-sm"

                                            onClick={() => onDelete(budget.id)}

                                        >

                                            Delete

                                        </button>

                                    </td>

                                </tr>

                            ))

                        )

                }

                </tbody>

            </table>

        </div>

    );

}

export default BudgetTable;