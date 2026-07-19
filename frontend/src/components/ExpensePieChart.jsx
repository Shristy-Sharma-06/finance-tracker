import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

const COLORS = [

    "#0d6efd",
    "#198754",
    "#dc3545",
    "#ffc107",
    "#6f42c1",
    "#fd7e14",
    "#20c997",
    "#6610f2",
    "#0dcaf0",
    "#6c757d",
    "#e83e8c",
    "#212529"

];

function ExpensePieChart({ data }) {

    return (

        <div className="card shadow-sm">

            <div className="card-body">

                <h5 className="mb-3">

                    Category Wise Expense

                </h5>

                <ResponsiveContainer
                    width="100%"
                    height={300}
                >

                    <PieChart>

                        <Pie
                            data={data}
                            dataKey="amount"
                            nameKey="category"
                            outerRadius={100}
                            label
                        >

                            {

                                data.map((entry, index) => (

                                    <Cell
                                        key={index}
                                        fill={COLORS[index % COLORS.length]}
                                    />

                                ))

                            }

                        </Pie>

                        <Tooltip />

                        <Legend />

                    </PieChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}

export default ExpensePieChart;