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

        <div className="bg-[#361c22]/80 rounded-[20px] border border-[#a97d53]/20 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.45)] p-6 backdrop-blur">

            <h2 className="text-xl font-semibold mb-6 text-[#f8ebd5]">

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