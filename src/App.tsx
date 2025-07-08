import { useState, useEffect, useRef } from "react";
import { evaluate } from "mathjs";
import { motion } from "motion/react";
import { BackspaceIcon } from "@phosphor-icons/react";

function App() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = (value: string) => {
    switch (value) {
      case "C":
        setExpression("");
        setResult("");
        break;
      case "Del":
        setExpression((prev) => prev.slice(0, -1));
        break;
      case "=":
        calculate();
        break;
      case "Ans":
        setExpression((prev) => prev + result);
        break;
      case "sqrt":
        setExpression((prev) => prev + "sqrt(");
        break;
      default:
        setExpression((prev) => prev + value);
        break;
    }
  };

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

  const calculate = () => {
    try {
      const evalResult = evaluate(expression);
      const evalString = `${expression} = ${evalResult}`;
      setResult(evalResult.toString());
      setHistory((prev) => [evalString, ...prev.slice(0, 9)]); // Keep max 10
    } catch {
      setResult(
        "Are ya sure that's a correct mathematical expression, genius?"
      );
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    const key = e.key;
    if ("0123456789+-*/().%^".includes(key)) {
      setExpression((prev) => prev + key);
    } else if (key === "Enter") {
      e.preventDefault();
      calculate();
    } else if (key === "Backspace") {
      setExpression((prev) => prev.slice(0, -1));
    } else if (key === "Escape") {
      setExpression("");
      setResult("");
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [expression]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen gap-6 flex flex-col lg:flex-row items-center justify-center bg-linear-65 from-[#736CED] to-[#D4C1EC] text-white p-4"
    >
      <div className="bg-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-md border-2 border-white">
        {/* Display */}
        <div className="mb-4 p-4 bg-gray-700 rounded-xl min-h-[5rem]">
          <div className="text-sm text-gray-400">Expression:</div>
          <div className="text-lg break-all">{expression || "0"}</div>
          <div className="text-sm text-gray-400 mt-2">Result:</div>
          <div className="text-2xl font-bold hyphens-auto">{result}</div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-3">
          {buttons.map((btn) => (
            <motion.button
              key={btn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleClick(btn)}
              className="bg-gray-600 hover:bg-gray-500 p-3 rounded-lg text-lg font-medium"
            >
              {btn === "Del" ? <BackspaceIcon /> : btn}
            </motion.button>
          ))}
        </div>
      </div>

      {/* History */}
      {history.length > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
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
      )}
    </div>
  );
}

export default App;
