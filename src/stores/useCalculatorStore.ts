import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { evaluate } from "mathjs";

type CalculatorState = {
  expression: string;
  result: string;
  history: string[];
  setExpression: (value: string) => void;
  append: (value: string) => void;
  calculate: () => void;
  clear: () => void;
  deleteLast: () => void;
};

export const useCalculatorStore = create<CalculatorState>()(
  devtools((set, get) => ({
    expression: "",
    result: "",
    history: [],
    setExpression: (value) => set({ expression: value }),
    append: (value) =>
      set((state) => ({ expression: state.expression + value })),
    calculate: () => {
      const expr = get().expression;
      try {
        const evalResult = evaluate(expr).toString();
        const full = `${expr} = ${evalResult}`;
        set((state) => ({
          result: evalResult,
          history: [full, ...state.history.slice(0, 9)],
        }));
      } catch {
        set({
          result:
            "Are ya sure that's a correct mathematical expression, genius?",
        });
      }
    },
    clear: () => set({ expression: "", result: "" }),
    deleteLast: () =>
      set((state) => ({ expression: state.expression.slice(0, -1) })),
  }))
);
