import { Clock3 } from "lucide-react";

function RecentActivity(){

    const activity=[

        "Uploaded Dataset",

        "Cleaned Dataset",

        "Trained Random Forest",

        "Generated Report"

    ];

    return(

        <div className="bg-white rounded-2xl shadow-sm border p-6">

            <div className="flex items-center gap-3 mb-6">

                <Clock3 className="text-blue-600"/>

                <h2 className="text-xl font-semibold">

                    Recent Activity

                </h2>

            </div>

            <div className="space-y-4">

                {

                    activity.map((item,index)=>(

                        <div

                            key={index}

                            className="flex items-center gap-3"

                        >

                            <div className="w-2 h-2 rounded-full bg-blue-600"/>

                            <p>{item}</p>

                        </div>

                    ))

                }

            </div>

        </div>

    )

}

export default RecentActivity;