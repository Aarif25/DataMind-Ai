import { motion } from "framer-motion";

function QuickAction({ icon: Icon, title, description, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.01, y: -1 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full rounded-[20px] border border-[#a97d53]/20 bg-[#361c22]/80 p-5 text-left shadow-[0_10px_30px_-18px_rgba(0,0,0,0.45)] backdrop-blur transition hover:border-[#a97d53]/35 hover:bg-[#3c2228]"
    >
      <div className="mb-4 inline-flex rounded-xl bg-[#4d2a2d] p-2.5 text-[#f2d7a0]">
        <Icon size={20} />
      </div>
      <h2 className="text-base font-semibold text-[#f8ebd5]">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-[#d7b98a]">{description}</p>
    </motion.button>
  );
}

export default QuickAction;