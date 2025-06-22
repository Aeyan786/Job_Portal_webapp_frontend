import { COMPANY_END_POINT } from "@/lib/Endpoint";
import { setCompanies } from "@/Redux/companySlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const getAllCompanies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(`${COMPANY_END_POINT}/get`, {
          withCredentials: true,
        });
        if (response.status !== "400") {
          dispatch(setCompanies(response.data.companies));
          
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCompanies();
  }, []);
};

export default getAllCompanies;
