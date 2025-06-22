import { APPLICATION_END_POINT, JOB_END_POINT } from "@/lib/Endpoint";
import { setGetAppliedJobs } from "@/Redux/jobSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const getAllAppliedJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllAppliedJobs = async () => {
      try {
        const response = await axios.get(
          `${APPLICATION_END_POINT}/getapplications`,
          { withCredentials: true }
        );
        if (response.status == 200) {
          dispatch(setGetAppliedJobs(response.data.userApplication));
          
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllAppliedJobs();
  }, []);
};

export default getAllAppliedJobs;
