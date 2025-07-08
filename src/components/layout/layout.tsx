import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ListIcon } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { appRoutes } from "../../routes";

export const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#736CED] to-[#D4C1EC] text-white">
      <header className="relative">
        <motion.button
          className="flex items-center gap-2 text-white hover:text-gray-300 p-4 hover:cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <ListIcon size={32} />
        </motion.button>
        <AnimatePresence>
          {isOpen && (
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
              initial={{ opacity: 0, y: -20, x: -10 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: -20, x: -10 }}
              className="absolute left-0 top-0 bg-gray-800 min-w-[160px] z-10 flex flex-col gap-y-4 border-b-2 border-r-2 rounded-br-2xl shadow-xl border-white"
            >
              <motion.button
                className="flex items-center gap-2 hover:text-gray-300 transition-colors duration-200 mt-4 ml-4 w-max hover:cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen((prev) => !prev)}
              >
                <ListIcon size={32} />
              </motion.button>
              <nav className="font-semibold">
                <ul>
                  {appRoutes.map(({ path, label }) => (
                    <li key={path}>
                      <NavLink
                        to={path}
                        className={({ isActive }) =>
                          `block px-4 py-4 cursor-pointer transition-colors duration-200 ${
                            isActive ? "font-bold" : ""
                          }`
                        }
                        onClick={() => setIsOpen(false)}
                      >
                        {label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};
