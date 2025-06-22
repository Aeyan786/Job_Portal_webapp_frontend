import React, { useEffect, useState } from "react";
import Navbar from "./Sharedcomponenets/Navbar";
import { Button } from "./ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import JobTable from "./JobTable";
import { useDispatch } from "react-redux";
import { setSearchJobBytext } from "@/Redux/jobSlice";

const AdminJobs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  useEffect(() => {
    dispatch(setSearchJobBytext(input));
  });
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10 px-4 ">
        <div className="flex justify-between">
          <input
            className="w-fit pl-2 rounded-lg "
            type="text"
            placeholder="Filter by role"
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <Button
            className="cursor-pointer bg-sky-900 hover:bg-sky-950"
            onClick={() => {
              navigate("/admin/createjob");
            }}
          >
            Create Job
          </Button>
        </div>
        <div className="my-8">
          <JobTable />
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;
