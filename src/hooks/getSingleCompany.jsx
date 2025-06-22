import { COMPANY_END_POINT } from "@/lib/Endpoint";
import { setSingleCompany } from "@/Redux/companySlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetSingleCompany = (companyId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        const response = await axios.get(
          `${COMPANY_END_POINT}/get/${companyId}`,
          {
            withCredentials: true,
          }
        );

        if (response.status !== 400) {
          dispatch(setSingleCompany(response.data.singleCompany));
        }
      } catch (error) {
        console.log("Error fetching single company:", error);
      }
    };

    if (companyId) {
      fetchSingleCompany();
    }
  }, [companyId, dispatch]);
};

export default useGetSingleCompany;
