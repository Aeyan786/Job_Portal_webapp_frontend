import { JOB_END_POINT } from "@/lib/Endpoint";
import { setallAdminJobs } from "@/Redux/jobSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const getAllAdminJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAdminJobs = async () => {
      try {
        const response = await axios.get(`${JOB_END_POINT}/getadminjobs`, {
          withCredentials: true,
        });
        if (response.status !== "400") {
          dispatch(setallAdminJobs(response.data.adminJobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAdminJobs();
  }, [dispatch]);
};

export default getAllAdminJobs;
