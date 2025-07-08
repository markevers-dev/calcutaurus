import { Calculator, History } from "../components";
import { motion } from "motion/react";

const Home = () => {
  return (
    <motion.div
      layout
      className="min-h-screen gap-6 flex flex-col lg:flex-row items-center lg:items-start justify-start lg:justify-center p-4"
    >
      <Calculator />
      <History />
    </motion.div>
  );
};

export default Home;
