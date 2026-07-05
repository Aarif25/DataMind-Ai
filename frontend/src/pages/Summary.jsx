import { useContext } from "react";

import { AppContext } from "../context/AppContext";

import {
    Database,
    Rows3,
    Columns3,
    AlertTriangle,
    HardDrive
} from "lucide-react";

function Summary() {

    const { summary } = useContext(AppContext);
    console.log(summary);

    if (!summary) {

        return (

            <div className="text-center mt-20">

                <h2 className="text-2xl font-semibold text-[#f8ebd5]">

                    No dataset uploaded.

                </h2>

                <p className="text-[#d7b98a] mt-2">

                    Please upload a CSV first.

                </p>

            </div>

        );

    }

    return (

        <div className="space-y-8">

            <h1 className="text-4xl font-bold text-[#f8ebd5]">

                Dataset Summary

            </h1>

            <div className="grid grid-cols-5 gap-5">

                <SummaryCard
                    icon={Rows3}
                    title="Rows"
                    value={summary.rows}
                />

                <SummaryCard
                    icon={Columns3}
                    title="Columns"
                    value={summary.columns}
                />

                <SummaryCard
                    icon={AlertTriangle}
                    title="Missing"
                    value={summary.missing_values}
                />

                <SummaryCard
                    icon={Database}
                    title="Duplicates"
                    value={summary.duplicate_rows}
                />

                <SummaryCard
                    icon={HardDrive}
                    title="Memory"
                    value={summary.memory_usage}
                />

            </div>

            <div className="grid grid-cols-2 gap-8">

                <div className="rounded-[20px] border border-[#a97d53]/20 bg-[#361c22]/80 p-5 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.45)] backdrop-blur">

                    <h2 className="text-lg font-semibold mb-5 text-[#f8ebd5]">

                        Numerical Columns

                    </h2>

                    {summary.numerical_columns?.map((col) => (

                        <p
                            key={col}
                            className="mb-2 text-[#d7b98a]"
                        >

                            {col}

                        </p>

                    ))}

                </div>

                <div className="rounded-[20px] border border-[#a97d53]/20 bg-[#361c22]/80 p-5 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.45)] backdrop-blur">

                    <h2 className="text-lg font-semibold mb-5 text-[#f8ebd5]">

                        Categorical Columns

                    </h2>

                    {summary.categorical_columns?.map((col) => (

                        <p
                            key={col}
                            className="mb-2 text-[#d7b98a]"
                        >

                            {col}

                        </p>

                    ))}

                </div>

            </div>

            <div className="rounded-[20px] border border-[#a97d53]/20 bg-[#361c22]/80 p-5 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.45)] backdrop-blur">

    <h2 className="text-lg font-semibold mb-5 text-[#f8ebd5]">

        Recommendations

    </h2>

    {
        summary.recommendations.map((item, index) => (

            <div
                key={index}
                className="border border-[#a97d53]/20 rounded-lg p-4 mb-4 bg-[#2f171b]/50"
            >

                <h3 className="font-semibold text-base text-[#f8ebd5]">

                    {item.title}

                </h3>

                <p className="text-sm text-[#d7b98a] mt-1">

                    Status: {item.status}

                </p>

                <p className="mt-2 text-[#e8dcc8]">

                    {item.description}

                </p>

                <p className="mt-3 text-[#c7a965] font-medium">

                    💡 {item.recommendation}

                </p>

            </div>

        ))
    }

</div>

        </div>

    );

}

function SummaryCard({

    icon: Icon,

    title,

    value

}) {

    return (

        <div className="rounded-[20px] border border-[#a97d53]/20 bg-[#361c22]/80 p-5 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.45)] backdrop-blur">

            <Icon className="text-[#c7a965] w-5 h-5" />

            <p className="text-[#d7b98a] mt-4 text-sm font-medium">

                {title}

            </p>

            <h2 className="text-2xl font-bold text-[#f8ebd5] mt-2">

                {value}

            </h2>

        </div>

    );

}

export default Summary;