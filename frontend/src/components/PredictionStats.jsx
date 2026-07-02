function PredictionStats({

    predictions=[]

}){

    return(

        <div className="bg-white rounded-xl border shadow-sm p-6">

            <h2 className="text-xl font-semibold mb-5">

                Prediction Summary

            </h2>

            <div className="grid grid-cols-3 gap-6">

                <div>

                    <p>Total Predictions</p>

                    <h2 className="text-3xl font-bold">

                        {predictions.length}

                    </h2>

                </div>

            </div>

        </div>

    )

}

export default PredictionStats;