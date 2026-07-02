import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function FeatureImportanceChart({

    data=[]

}){

    return(

        <div className="bg-white rounded-xl border shadow-sm p-6">

            <h2 className="text-xl font-semibold mb-6">

                Feature Importance

            </h2>

            <ResponsiveContainer
                width="100%"
                height={350}
            >

                <BarChart
                    data={data}
                    layout="vertical"
                >

                    <XAxis
                        type="number"
                    />

                    <YAxis

                        type="category"

                        dataKey="feature"

                    />

                    <Tooltip/>

                    <Bar

                        dataKey="importance"

                        radius={[0,6,6,0]}

                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    )

}

export default FeatureImportanceChart;