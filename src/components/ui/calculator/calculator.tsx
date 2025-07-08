import { motion } from "motion/react";
import { BackspaceIcon } from "@phosphor-icons/react";
import { useEffect } from "react";
import { useCalculatorStore } from "../../../stores/useCalculatorStore";

const buttons = [
  "(",
  ")",
  "C",
  "Del",
  "7",
  "8",
  "9",
  "/",
  "4",
  "5",
  "6",
  "*",
  "1",
  "2",
  "3",
  "-",
  "0",
  ".",
  "=",
  "+",
  "sqrt",
  "^",
  "%",
  "Ans",
];

export const Calculator = () => {
  const {
    expression,
    result,
    append,
    setExpression,
    calculate,
    clear,
    deleteLast,
  } = useCalculatorStore();

  const handleClick = (value: string) => {
    switch (value) {
      case "C":
        clear();
        break;
      case "Del":
        deleteLast();
        break;
      case "=":
        calculate();
        break;
      case "Ans":
        append(result);
        break;
      case "sqrt":
        append("sqrt(");
        break;
      default:
        append(value);
        break;
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    const key = e.key;
    if ("0123456789+-*/().%^".includes(key)) {
      setExpression(expression + key);
    } else if (key === "Enter") {
      e.preventDefault();
      calculate();
    } else if (key === "Backspace") {
      deleteLast();
    } else if (key === "Escape") {
      clear();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <motion.div
      layout
      className="bg-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-md border-2 border-white"
    >
      <div className="mb-4 p-4 bg-gray-700 rounded-xl min-h-[5rem]">
        <div className="text-sm text-gray-400">Expression:</div>
        <div className="text-lg break-all">{expression || "0"}</div>
        <div className="text-sm text-gray-400 mt-2">Result:</div>
        <div className="text-2xl font-bold hyphens-auto">{result}</div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {buttons.map((btn) => (
          <motion.button
            key={btn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick(btn)}
            className="bg-gray-600 hover:bg-gray-500 p-3 rounded-lg text-lg font-medium flex items-center justify-center"
          >
            {btn === "Del" ? <BackspaceIcon size={24} /> : btn}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};
