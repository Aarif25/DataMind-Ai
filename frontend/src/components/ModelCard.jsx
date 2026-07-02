function ModelCard({

    title,

    value,

    subtitle

}){

    return(

        <div className="bg-white rounded-xl shadow-sm border p-6">

            <p className="text-gray-500">

                {title}

            </p>

            <h2 className="text-3xl font-bold mt-3">

                {value}

            </h2>

            {

                subtitle &&

                <p className="text-gray-500 mt-2">

                    {subtitle}

                </p>

            }

        </div>

    )

}

export default ModelCard;