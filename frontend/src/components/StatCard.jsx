import { motion } from "framer-motion";

function StatCard({
  title,
  value,
  icon: Icon,
  color = "text-blue-600"
}) {

  return (

    <motion.div

      whileHover={{ scale: 1.03 }}

      className="bg-white rounded-2xl shadow-sm border p-6"

    >

      <div className="flex justify-between items-center">

        <div>

          <p className="text-gray-500 text-sm">

            {title}

          </p>

          <h2 className="text-3xl font-bold mt-2">

            {value}

          </h2>

        </div>

        <Icon
          className={color}
          size={38}
        />

      </div>

    </motion.div>

  );

}

export default StatCard;