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

                <h2 className="text-2xl font-semibold">

                    No dataset uploaded.

                </h2>

                <p className="text-gray-500 mt-2">

                    Please upload a CSV first.

                </p>

            </div>

        );

    }

    return (

        <div className="space-y-8">

            <h1 className="text-4xl font-bold">

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

                <div className="bg-white rounded-xl border shadow-sm p-6">

                    <h2 className="text-xl font-semibold mb-5">

                        Numerical Columns

                    </h2>

                    {summary.numerical_columns?.map((col) => (

                        <p
                            key={col}
                            className="mb-2"
                        >

                            {col}

                        </p>

                    ))}

                </div>

                <div className="bg-white rounded-xl border shadow-sm p-6">

                    <h2 className="text-xl font-semibold mb-5">

                        Categorical Columns

                    </h2>

                    {summary.categorical_columns?.map((col) => (

                        <p
                            key={col}
                            className="mb-2"
                        >

                            {col}

                        </p>

                    ))}

                </div>

            </div>

            <div className="bg-white rounded-xl border shadow-sm p-6">

    <h2 className="text-2xl font-semibold mb-5">

        Recommendations

    </h2>

    {
        summary.recommendations.map((item, index) => (

            <div
                key={index}
                className="border rounded-lg p-4 mb-4"
            >

                <h3 className="font-semibold text-lg">

                    {item.title}

                </h3>

                <p className="text-sm text-gray-500 mt-1">

                    Status: {item.status}

                </p>

                <p className="mt-2">

                    {item.description}

                </p>

                <p className="mt-3 text-blue-600 font-medium">

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

        <div className="bg-white rounded-xl border shadow-sm p-5">

            <Icon className="text-blue-600" />

            <p className="text-gray-500 mt-4">

                {title}

            </p>

            <h2 className="text-3xl font-bold">

                {value}

            </h2>

        </div>

    );

}

export default Summary;