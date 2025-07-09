import { motion } from "motion/react";
import { useBaseNumberStore } from "../../../stores/useBaseNumberStore";

export const BaseNumberDropdown = ({
  type,
  setIsOpen,
}: {
  type: "from" | "to";
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const { baseNumberTypes, setFromBase, setToBase } = useBaseNumberStore();
  const selectedBase =
    type === "from"
      ? useBaseNumberStore.getState().fromBase
      : useBaseNumberStore.getState().toBase;

  return (
    <motion.div
      ref={(ref) => {
        if (!ref) return;
        const handleClick = (e: MouseEvent) => {
          if (!ref.contains(e.target as Node)) setIsOpen(false);
        };
        document.addEventListener("mousedown", handleClick);
        return () => {
          document.removeEventListener("mousedown", handleClick);
        };
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="absolute w-max left-0 top-full bg-gray-800 z-10 grid grid-cols-2 gap-4 border-b-2 border-2 rounded-2xl shadow-xl border-white p-2"
    >
      {baseNumberTypes.map((base) => (
        <motion.button
          key={base}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            if (type === "from") {
              setFromBase(base);
            } else {
              setToBase(base);
            }
            setIsOpen(false);
          }}
          className={`min-w-[6rem] px-4 py-2 rounded-lg text-lg font-medium flex items-center justify-center transition-colors ${
            base === selectedBase
              ? "bg-gray-500"
              : "bg-gray-600 hover:bg-gray-500"
          }`}
        >
          {base.charAt(0).toUpperCase() + base.slice(1)}
        </motion.button>
      ))}
    </motion.div>
  );
};
