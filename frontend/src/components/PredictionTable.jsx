function PredictionTable({

    data=[]

}){

    if(data.length===0){

        return null;

    }

    const columns=Object.keys(data[0]);

    return(

        <div className="bg-[#361c22]/80 rounded-[20px] border border-[#a97d53]/20 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.45)] p-6 backdrop-blur overflow-auto">

            <h2 className="text-xl font-semibold mb-6 text-[#f8ebd5]">

                Prediction Results

            </h2>

            <table className="w-full">

                <thead>

                    <tr>

                        {

                            columns.map(col=>(

                                <th
                                    key={col}
                                    className="text-left pb-4 text-[#d7b98a]"
                                >

                                    {col}

                                </th>

                            ))

                        }

                    </tr>

                </thead>

                <tbody>

                    {

                        data.map((row,index)=>(

                            <tr
                                key={index}
                                className="border-t border-[#a97d53]/20"
                            >

                                {

                                    columns.map(col=>(

                                        <td
                                            key={col}
                                            className="py-3 text-[#e8dcc8]"
                                        >

                                            {row[col]}

                                        </td>

                                    ))

                                }

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    )

}

export default PredictionTable;