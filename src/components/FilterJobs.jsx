import React, { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/Redux/jobSlice";

const FilterJobs = () => {
  const filterData = [
    {
      filterType: "Location",
      array: [
        "Karachi",
        "Lahore",
        "Islamabad",
        "Multan",
        "Faisalabad",
        "peshawar",
      ],
    },
    {
      filterType: "Job Type",
      array: ["Remote", "Part Time", "Full Time"],
    },
    {
      filterType: "Salary",
      array: ["0-40k", "41k-100k", "101k-150k"],
    },
  ];
  const [selectedValue, setSelecetedvalue] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchQuery(selectedValue));
    
  }, [selectedValue]);

  return (
    <div className="p-4 rounded-md border bg-white shadow-md max-w-sm">
      <h1 className="text-xl font-semibold mb-2">Filter Jobs</h1>
      <hr className="mb-4" />

      {filterData.map((filter, index) => (
        <div key={index} className="mb-4">
          <h2 className="font-medium mb-2">{filter.filterType}</h2>
          <div className="space-y-2">
            {filter.array.map((option, i) => (
              <div className="flex items-center space-x-2" key={i}>
                <input
                  onChange={(e) => {
                    setSelecetedvalue(e.target.value);
                  }}
                  type="radio"
                  name="filter"
                  value={option}
                  id={`${filter.filterType}-${i}`}
                  className="cursor-pointer"
                />
                <Label
                  htmlFor={`${filter.filterType}-${i}`}
                  className="cursor-pointer"
                >
                  {option}
                </Label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilterJobs;
