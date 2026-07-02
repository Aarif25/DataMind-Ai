import { Database, Rows3, Columns3, AlertTriangle } from "lucide-react";

function DatasetOverview() {

    const dataset = {

        name:"No Dataset Uploaded",

        rows:"--",

        columns:"--",

        missing:"--"

    };

    return(

        <div className="bg-white rounded-2xl shadow-sm border p-6">

            <div className="flex items-center gap-3 mb-6">

                <Database className="text-blue-600"/>

                <h2 className="text-xl font-semibold">

                    Dataset Overview

                </h2>

            </div>

            <div className="space-y-5">

                <div>

                    <p className="text-gray-500">

                        Dataset

                    </p>

                    <p className="font-semibold">

                        {dataset.name}

                    </p>

                </div>

                <div className="grid grid-cols-3 gap-4">

                    <div>

                        <Rows3 className="mb-2"/>

                        <p>{dataset.rows}</p>

                        <span className="text-gray-500 text-sm">

                            Rows

                        </span>

                    </div>

                    <div>

                        <Columns3 className="mb-2"/>

                        <p>{dataset.columns}</p>

                        <span className="text-gray-500 text-sm">

                            Columns

                        </span>

                    </div>

                    <div>

                        <AlertTriangle className="mb-2"/>

                        <p>{dataset.missing}</p>

                        <span className="text-gray-500 text-sm">

                            Missing

                        </span>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default DatasetOverview;