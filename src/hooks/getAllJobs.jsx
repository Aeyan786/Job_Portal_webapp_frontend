import { JOB_END_POINT } from "@/lib/Endpoint";
import { setResetAllJobs } from "@/Redux/jobSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${JOB_END_POINT}/getjobs`);
        if (response.status !== "400") {
          dispatch(setResetAllJobs(response.data.allJobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobs();
  }, [dispatch]);
};

export default useGetAllJobs;
