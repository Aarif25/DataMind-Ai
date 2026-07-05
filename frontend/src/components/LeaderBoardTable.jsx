function LeaderboardTable({ leaderboard = [] }) {

    return (

        <div className="bg-[#361c22]/80 rounded-[20px] border border-[#a97d53]/20 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.45)] p-6 backdrop-blur overflow-auto">

            <h2 className="text-xl font-semibold mb-5 text-[#f8ebd5]">

                Leaderboard

            </h2>

            <table className="w-full">

                <thead>

                    <tr className="border-b border-[#a97d53]/20">

                        <th className="text-left pb-3 text-[#d7b98a]">

                            Rank

                        </th>

                        <th className="text-left text-[#d7b98a]">

                            Model

                        </th>

                        <th className="text-left text-[#d7b98a]">

                            Score

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {

                        leaderboard.map((model,index)=>(

                            <tr
                                key={index}
                                className="border-b border-[#a97d53]/20"

                            >

                                <td className="py-3 text-[#f8ebd5]">

                                    {index+1}

                                </td>

                                <td className="text-[#e8dcc8]">

                                    {model.model}

                                </td>

                                <td className="text-[#c7a965]">

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