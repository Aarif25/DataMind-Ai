function RecommendationCard({

    recommendation

}){

    if(!recommendation){

        return null;

    }

    return(

        <div className="bg-white rounded-xl border shadow-sm p-6">

            <h2 className="text-xl font-semibold">

                AI Recommendation

            </h2>

            <div className="mt-5">

                <p>

                    <strong>

                        Model

                    </strong>

                </p>

                <p>

                    {

                        recommendation.recommended_model

                    }

                </p>

            </div>

            <div className="mt-5">

                <p>

                    <strong>

                        Confidence

                    </strong>

                </p>

                <p>

                    {

                        recommendation.confidence

                    }%

                </p>

            </div>

            <div className="mt-5">

                <strong>

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