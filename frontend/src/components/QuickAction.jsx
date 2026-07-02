import { motion } from "framer-motion";

function QuickAction({

    icon: Icon,

    title,

    description,

    onClick

}){

    return(

        <motion.button

            whileHover={{scale:1.03}}

            whileTap={{scale:.98}}

            onClick={onClick}

            className="bg-white rounded-xl shadow-sm border p-5 text-left w-full"

        >

            <Icon

                className="text-blue-600 mb-4"

                size={34}

            />

            <h2 className="font-semibold text-lg">

                {title}

            </h2>

            <p className="text-gray-500 mt-2">

                {description}

            </p>

        </motion.button>

    )

}

export default QuickAction;