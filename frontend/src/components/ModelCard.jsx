function ModelCard({

    title,

    value,

    subtitle

}){

    return(

        <div className="rounded-[20px] border border-[#a97d53]/20 bg-[#361c22]/80 p-5 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.45)] backdrop-blur">

            <p className="text-sm font-medium text-[#d7b98a]">

                {title}

            </p>

            <h2 className="text-2xl font-bold mt-3 text-[#f8ebd5]">

                {value}

            </h2>

            {

                subtitle &&

                <p className="text-sm text-[#c7a965] mt-2">

                    {subtitle}

                </p>

            }

        </div>

    )

}

export default ModelCard;