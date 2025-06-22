import React, { useEffect, useState } from "react";
import Navbar from "./Sharedcomponenets/Navbar";
import FilterJobs from "./FilterJobs";
import JobCards from "./JobCards";
import { useDispatch, useSelector } from "react-redux";
import useGetAllJobs from "@/hooks/getAllJobs";
import { setSearchQuery } from "@/Redux/jobSlice";
import { motion } from "framer-motion";
import { Filter, X } from "lucide-react";

const Jobs = () => {
  useGetAllJobs();
  const dispatch = useDispatch();
  const { resetAllJobs, searchQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    dispatch(setSearchQuery(""));
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      setFilterJobs(resetAllJobs);
      return;
    }

    const filteredJobs = resetAllJobs.filter((job) => {
      if (searchQuery.includes("k")) {
        const [minStr, maxStr] = searchQuery.toLowerCase().split("-");
        const minSalary = parseInt(
          minStr?.replace("k", "000").replace(/,/g, "")
        );
        const maxSalary = parseInt(
          maxStr?.replace("k", "000").replace(/,/g, "")
        );
        const jobSalary = parseInt(job.salary.replace(/,/g, "").trim());
        return jobSalary >= minSalary && jobSalary <= maxSalary;
      }

      return (
        job.jobType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

    setFilterJobs(filteredJobs);
  }, [resetAllJobs, searchQuery]);

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto mt-5 px-4">
        <div className="flex justify-end mb-3 md:hidden">
          <button
            onClick={() => setShowFilter(true)}
            className="flex items-center gap-2 text-white bg-sky-800 px-4 py-2 rounded-md"
          >
            <Filter size={18} />
            Filter
          </button>
        </div>

        <div className="flex gap-5">
          <div className="hidden md:block w-[20%]">
            <FilterJobs />
          </div>

          <div className="flex-1 h-[80vh] overflow-y-auto pb-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filterJobs.length === 0 ? (
                <span className="text-center text-lg font-bold">
                  Sorry! Jobs not found
                </span>
              ) : (
                filterJobs.map((e, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: -100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 100 }}
                    transition={{ duration: 0.3 }}
                  >
                    <JobCards jobs={e} />
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>

        <div
          className={`fixed top-0 left-0 h-full w-[75%] sm:w-[60%] bg-white shadow-lg z-50 p-4 transition-transform transform duration-300 md:hidden ${
            showFilter ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-end mb-2">
            <button onClick={() => setShowFilter(false)}>
              <X />
            </button>
          </div>
          <FilterJobs />
        </div>
      </div>
    </div>
  );
};

export default Jobs;
