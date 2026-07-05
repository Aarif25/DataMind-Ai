function RecommendationCard({

    recommendation

}){

    if(!recommendation){

        return null;

    }

    return(

        <div className="bg-[#361c22]/80 rounded-[20px] border border-[#a97d53]/20 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.45)] p-6 backdrop-blur">

            <h2 className="text-xl font-semibold text-[#f8ebd5]">

                Recommendation

            </h2>

            <div className="mt-5">

                <p className="text-[#d7b98a]">

                    <strong>

                        Model

                    </strong>

                </p>

                <p className="text-[#e8dcc8]">

                    {

                        recommendation.recommended_model

                    }

                </p>

            </div>

            <div className="mt-5">

                <p className="text-[#d7b98a]">

                    <strong>

                        Confidence

                    </strong>

                </p>

                <p className="text-[#e8dcc8]">

                    {

                        recommendation.confidence

                    }%

                </p>

            </div>

            <div className="mt-5">

                <strong className="text-[#d7b98a]">

                    Reasons

                </strong>

                {

                    recommendation.reasons.map((reason,index)=>(

                        <p
                            key={index}
                            className="mt-2"
                        >

                            ✅ {reason}

                        </p>

                    ))

                }

            </div>

        </div>

    )

}

export default RecommendationCard;