import React from "react";
import LatestJobCard from "./LatestJobCard";
import { useSelector } from "react-redux";
import getAllJobs from "@/hooks/getAllJobs";
import { motion } from "framer-motion";

const LatestJobs = () => {
  getAllJobs();
  const { resetAllJobs } = useSelector((store) => store.job);

  return (
    <div className="my-10 px-4">
      <div className="text-center mb-8">
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-sky-950">
          Top Opportunities
        </h1>
      </div>

      <div className="flex flex-wrap justify-center gap-5">
        {resetAllJobs.length === 0 ? (
          <span className="font-medium text-gray-700">No Jobs Available</span>
        ) : (
          resetAllJobs.slice(0, 6).map((e, i) => (
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              key={i}
              className="w-full sm:w-[90%] md:w-[45%] lg:w-[30%]"
            >
              <LatestJobCard job={e} />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
