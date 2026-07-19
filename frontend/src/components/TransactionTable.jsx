function TransactionTable({

                              transactions,
                              onEdit,
                              onDelete

                          }) {

    return (

        <div className="table-responsive">

            <table className="table table-bordered table-hover align-middle">

                <thead className="table-dark">

                <tr>

                    <th>ID</th>

                    <th>Amount</th>

                    <th>Type</th>

                    <th>Category</th>

                    <th>Description</th>

                    <th>Date</th>

                    <th>Actions</th>

                </tr>

                </thead>

                <tbody>

                {

                    transactions.length === 0 ?

                        (

                            <tr>

                                <td
                                    colSpan="7"
                                    className="text-center"
                                >

                                    No Transactions Found

                                </td>

                            </tr>

                        )

                        :

                        (

                            transactions.map((transaction) => (

                                <tr key={transaction.id}>

                                    <td>

                                        {transaction.id}

                                    </td>

                                    <td>

                                        ₹ {transaction.amount}

                                    </td>

                                    <td>

                                        {transaction.transactionType}

                                    </td>

                                    <td>

                                        {transaction.category}

                                    </td>

                                    <td>

                                        {transaction.description}

                                    </td>

                                    <td>

                                        {transaction.date}

                                    </td>

                                    <td>

                                        <button

                                            className="btn btn-warning btn-sm me-2"

                                            onClick={() =>
                                                onEdit(transaction)
                                            }

                                        >

                                            Edit

                                        </button>

                                        <button

                                            className="btn btn-danger btn-sm"

                                            onClick={() =>
                                                onDelete(transaction.id)
                                            }

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

export default TransactionTable;