import { motion, AnimatePresence } from "motion/react";
import { ArrowSquareRightIcon } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import { BaseNumberDropdown } from "../components";
import { useBaseNumberStore } from "../stores/useBaseNumberStore";

const BaseConverter = () => {
  const {
    fromBase,
    toBase,
    inputValue,
    convertedValue,
    setInputValue,
    setConvertedValue,
    convertBase,
  } = useBaseNumberStore();
  const [isFromBaseOpen, setIsFromBaseOpen] = useState<boolean>(false);
  const [isToBaseOpen, setIsToBaseOpen] = useState<boolean>(false);

  useEffect(() => {
    const result = convertBase(inputValue, fromBase, toBase);
    setConvertedValue(result);
  }, [inputValue, fromBase, toBase]);

  return (
    <motion.div
      layout
      className="min-h-screen gap-6 flex flex-col lg:flex-row items-center lg:items-start justify-start lg:justify-center p-4"
    >
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-md border-2 border-white"
      >
        <div className="flex flex-row gap-4 items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (!isFromBaseOpen) {
                setIsFromBaseOpen(true);
              }
            }}
            className="bg-gray-600 hover:bg-gray-500 p-3 rounded-lg text-lg font-medium flex items-center justify-center relative"
          >
            {fromBase === "" ? "From" : fromBase}
            <AnimatePresence>
              {isFromBaseOpen && (
                <BaseNumberDropdown type="from" setIsOpen={setIsFromBaseOpen} />
              )}
            </AnimatePresence>
          </motion.button>
          <ArrowSquareRightIcon size={32} />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (!isToBaseOpen) {
                setIsToBaseOpen(true);
              }
            }}
            className="bg-gray-600 hover:bg-gray-500 p-3 rounded-lg text-lg font-medium flex items-center justify-center"
          >
            <AnimatePresence>
              {isToBaseOpen && (
                <BaseNumberDropdown type="to" setIsOpen={setIsToBaseOpen} />
              )}
            </AnimatePresence>
            {toBase === "" ? "To" : toBase}
          </motion.button>
        </div>
        <div>
          <motion.input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={`Enter number in ${fromBase || "base"}`}
            className="w-full mt-4 p-3 bg-gray-700 text-white rounded-lg border-2 border-gray-600 focus:outline-none focus:border-gray-500"
          />
          <motion.input
            type="text"
            value={convertedValue}
            placeholder={`Converted number in ${toBase || "base"}`}
            disabled
            className="w-full mt-4 p-3 bg-gray-700 text-white rounded-lg border-2 border-gray-600 focus:outline-none focus:border-gray-500"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BaseConverter;
