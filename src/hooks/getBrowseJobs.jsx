import { JOB_END_POINT } from "@/lib/Endpoint";
import { setBrowsejobs, setResetAllJobs } from "@/Redux/jobSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const getBrowsejobs = () => {
  const dispatch = useDispatch();
  const { searchQuery } = useSelector((store) => store.job);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          `${JOB_END_POINT}/getjobs?keyword=${searchQuery}`,
         
        );
        if (response.status !== "400") {
          dispatch(setBrowsejobs(response.data.allJobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobs();
  }, [dispatch]);
};

export default getBrowsejobs;
