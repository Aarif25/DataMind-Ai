function LeaderboardTable({ leaderboard = [] }) {

    return (

        <div className="bg-white rounded-xl shadow-sm border p-6">

            <h2 className="text-xl font-semibold mb-5">

                Leaderboard

            </h2>

            <table className="w-full">

                <thead>

                    <tr className="border-b">

                        <th className="text-left pb-3">

                            Rank

                        </th>

                        <th className="text-left">

                            Model

                        </th>

                        <th className="text-left">

                            Score

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {

                        leaderboard.map((model,index)=>(

                            <tr
                                key={index}
                                className="border-b"

                            >

                                <td className="py-3">

                                    {index+1}

                                </td>

                                <td>

                                    {model.model}

                                </td>

                                <td>

                                    {

                                        model.accuracy ??

                                        model.r2_score

                                    }

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    )

}

export default LeaderboardTable;