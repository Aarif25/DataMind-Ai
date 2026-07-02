function PredictionTable({

    data=[]

}){

    if(data.length===0){

        return null;

    }

    const columns=Object.keys(data[0]);

    return(

        <div className="bg-white rounded-xl border shadow-sm p-6 overflow-auto">

            <h2 className="text-xl font-semibold mb-6">

                Prediction Results

            </h2>

            <table className="w-full">

                <thead>

                    <tr>

                        {

                            columns.map(col=>(

                                <th
                                    key={col}
                                    className="text-left pb-4"
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
                                className="border-t"
                            >

                                {

                                    columns.map(col=>(

                                        <td
                                            key={col}
                                            className="py-3"
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