import React, { useEffect } from "react";
import Navbar from "./Sharedcomponenets/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_END_POINT } from "@/lib/Endpoint";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setApplicants } from "@/Redux/applicationSlice";

const Applicants = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const response = await axios.get(
          `${APPLICATION_END_POINT}/getapplicants/${id}`,
          { withCredentials: true }
        );
        if (response.status == 200) {
          dispatch(setApplicants(response.data.applicantAppliedjob));
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (id) {
      fetchAllApplicants();
    }
  }, []);

  return (
    <div>
      <Navbar />

      <div className="max-w-6xl mx-auto my-10 px-4">
        <h1 className="text-lg font-bold">
          Applicants ({applicants?.applications?.length || "(0)"} )
        </h1>
        <div className="my-8">
          <ApplicantsTable />
        </div>
      </div>
    </div>
  );
};

export default Applicants;
