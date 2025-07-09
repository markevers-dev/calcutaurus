import { create } from "zustand";
import { devtools } from "zustand/middleware";

type BaseNumberState = {
  baseNumberTypes: string[];
  baseMap: Record<string, number>;
  fromBase: string;
  setFromBase: (base: string) => void;
  toBase: string;
  setToBase: (base: string) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
  convertedValue: string;
  setConvertedValue: (value: string) => void;
  convertBase: (value: string, from: string, to: string) => string;
};

export const useBaseNumberStore = create<BaseNumberState>()(
  devtools((set, get) => ({
    baseNumberTypes: ["Binary", "Octal", "Decimal", "Hexadecimal"],
    baseMap: {
      Binary: 2,
      Octal: 8,
      Decimal: 10,
      Hexadecimal: 16,
    },
    fromBase: "",
    setFromBase: (base: string) => set({ fromBase: base }),
    toBase: "",
    setToBase: (base: string) => set({ toBase: base }),
    inputValue: "",
    setInputValue: (value: string) => set({ inputValue: value }),
    convertedValue: "",
    setConvertedValue: (value: string) => set({ convertedValue: value }),
    convertBase: (value: string, from: string, to: string): string => {
      if (!from || !to || value.trim() === "") return "";

      try {
        const fromRadix = get().baseMap[from];
        const toRadix = get().baseMap[to];

        const decimal = parseInt(value, fromRadix);
        if (isNaN(decimal)) return "Invalid";

        return decimal.toString(toRadix).toUpperCase();
      } catch {
        return "Error";
      }
    },
  }))
);
