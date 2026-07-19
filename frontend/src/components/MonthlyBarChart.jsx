import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";

function MonthlyBarChart({ data }) {

    return (

        <div className="card shadow-sm">

            <div className="card-body">

                <h5 className="mb-3">

                    Monthly Expense Trend

                </h5>

                <ResponsiveContainer
                    width="100%"
                    height={300}
                >

                    <BarChart data={data}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="month" />

                        <YAxis />

                        <Tooltip />

                        <Bar
                            dataKey="expense"
                            fill="#0d6efd"
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}

export default MonthlyBarChart;