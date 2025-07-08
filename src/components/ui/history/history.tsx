import { motion } from "motion/react";
import { useCalculatorStore } from "../../../stores/useCalculatorStore";

export const History = () => {
  const history = useCalculatorStore((state) => state.history);
  const setExpression = useCalculatorStore((state) => state.setExpression);

  if (history.length === 0) return null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md bg-gray-800 p-4 rounded-2xl shadow-inner border-2 border-white"
    >
      <h2 className="text-xl font-semibold mb-2 text-gray-300">History</h2>
      <ul className="text-sm space-y-1 max-h-48 overflow-y-auto">
        {history.map((entry, idx) => (
          <li
            key={idx}
            className="text-gray-400 hover:text-white cursor-pointer"
            onClick={() => setExpression(entry.split(" = ")[0])}
          >
            {entry}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};
