import { Trophy } from "lucide-react";

function Leaderboard(){

    const models=[

        {
            name:"Random Forest",
            score:"--"
        },

        {
            name:"XGBoost",
            score:"--"
        },

        {
            name:"Decision Tree",
            score:"--"
        }

    ];

    return(

        <div className="bg-white rounded-2xl shadow-sm border p-6">

            <div className="flex items-center gap-3 mb-6">

                <Trophy className="text-yellow-500"/>

                <h2 className="text-xl font-semibold">

                    Leaderboard

                </h2>

            </div>

            <table className="w-full">

                <thead>

                    <tr className="text-left text-gray-500">

                        <th>Model</th>

                        <th>Score</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        models.map((model,index)=>(

                            <tr

                                key={index}

                                className="border-t"

                            >

                                <td className="py-3">

                                    {model.name}

                                </td>

                                <td>

                                    {model.score}

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    )

}

export default Leaderboard;