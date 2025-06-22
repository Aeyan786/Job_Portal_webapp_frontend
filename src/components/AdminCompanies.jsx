import React, { useEffect, useState } from "react";
import Navbar from "./Sharedcomponenets/Navbar";
import { Button } from "./ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/Redux/companySlice";

const AdminCompanies = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input, dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10 px-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <input
            className="w-full sm:w-1/2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-800"
            type="text"
            placeholder="Filter by company name"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            className="w-full sm:w-auto bg-sky-900 hover:bg-sky-950"
            onClick={() => navigate("/admin/companyregister")}
          >
            Register Company
          </Button>
        </div>

        <div className="my-8">
          <CompaniesTable />
        </div>
      </div>
    </div>
  );
};

export default AdminCompanies;
