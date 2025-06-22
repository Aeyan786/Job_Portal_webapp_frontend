import React, { useEffect } from "react";
import Navbar from "./Sharedcomponenets/Navbar";
import JobCards from "./JobCards";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "@/Redux/jobSlice";
import getBrowsejobs from "@/hooks/getBrowseJobs";

const Browse = () => {
  getBrowsejobs();

  const { searchQuery, browseJobs } = useSelector((store) => store.job);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {searchQuery === "" || browseJobs.length === 0 ? (
          <p className="text-center font-semibold text-lg my-20 text-gray-600">
            No search results found
          </p>
        ) : (
          <>
            <h1 className="font-bold text-xl my-8 text-gray-900">
              Search Results ({browseJobs?.length})
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {browseJobs?.map((e, i) => (
                <div key={i}>
                  <JobCards jobs={e} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Browse;
