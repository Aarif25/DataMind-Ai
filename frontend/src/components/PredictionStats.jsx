function PredictionStats({

    predictions=[]

}){

    return(

        <div className="bg-[#361c22]/80 rounded-[20px] border border-[#a97d53]/20 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.45)] p-6 backdrop-blur">

            <h2 className="text-xl font-semibold mb-5 text-[#f8ebd5]">

                Prediction Summary

            </h2>

            <div className="grid grid-cols-3 gap-6">

                <div>

                    <p className="text-[#d7b98a]">Total Predictions</p>

                    <h2 className="text-3xl font-bold text-[#f8ebd5]">

                        {predictions.length}

                    </h2>

                </div>

            </div>

        </div>

    )

}

export default PredictionStats;