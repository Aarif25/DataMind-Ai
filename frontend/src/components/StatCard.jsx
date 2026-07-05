import { motion } from "framer-motion";

function StatCard({
  title,
  value,
  icon: Icon,
  color = "text-amber-600"
}) {
  const palette = {
    "text-amber-600": {
      icon: "from-amber-500 to-yellow-500",
      bar: "bg-amber-500",
      bg: "bg-amber-900/30"
    },
    "text-green-600": {
      icon: "from-emerald-500 to-green-500",
      bar: "bg-emerald-500",
      bg: "bg-amber-900/30"
    },
    "text-yellow-500": {
      icon: "from-amber-400 to-yellow-500",
      bar: "bg-amber-500",
      bg: "bg-amber-900/30"
    },
    "text-purple-600": {
      icon: "from-violet-500 to-purple-600",
      bar: "bg-violet-500",
      bg: "bg-amber-900/30"
    }
  };

  const style = palette[color] || palette["text-amber-600"];

  return (
    <motion.div
      whileHover={{ scale: 1.01, y: -1 }}
      className="group relative overflow-hidden rounded-[20px] border border-[#a97d53]/20 bg-[#361c22]/80 p-5 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.45)] backdrop-blur"
    >
      <div className={`absolute right-4 top-4 rounded-xl bg-gradient-to-br ${style.icon} p-2.5 text-white shadow-sm`}>
        <Icon size={18} />
      </div>

      <p className="text-sm font-medium text-[#d7b98a]">{title}</p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#f8ebd5]">{value}</h2>
      <div className="mt-4 h-[2px] rounded-full bg-[#5b342b]/70">
        <div className={`h-[2px] w-3/4 rounded-full ${style.bar}`} />
      </div>
    </motion.div>
  );
}

export default StatCard;