import React, { useEffect, useState } from "react";
import Navbar from "./Sharedcomponenets/Navbar";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { COMPANY_END_POINT } from "@/lib/Endpoint";
import { useDispatch, useSelector } from "react-redux";
import { setSingleCompany } from "@/Redux/companySlice";
import { toast } from "sonner";
import useGetSingleCompany from "@/hooks/getSingleCompany";

const UpdateCompany = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);

  useGetSingleCompany(id);

  const [updatedData, setUpdatedData] = useState({
    name: "",
    location: "",
    description: "",
    website: "",
    logo: null,
  });

  useEffect(() => {
    if (singleCompany) {
      setUpdatedData({
        name: singleCompany?.name || "",
        location: singleCompany?.location || "",
        description: singleCompany?.description || "",
        website: singleCompany?.website || "",
        logo: null,
      });
    }
  }, [singleCompany]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", updatedData.name);
    formData.append("description", updatedData.description);
    formData.append("website", updatedData.website);
    formData.append("location", updatedData.location);
    if (updatedData.logo) {
      formData.append("file", updatedData.logo);
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${COMPANY_END_POINT}/update/${id}`,
        formData,
        {
          headers: { "content-type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        dispatch(setSingleCompany(response.data.updatedCompanyData));
        toast.success(response.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 my-10">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          Update Company Information
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          Make necessary updates to the company's info.
        </p>

        <form onSubmit={handleUpdate} className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className='mb-1'>Company Name</Label>
              <Input
                value={updatedData.name}
                onChange={(e) => setUpdatedData({ ...updatedData, name: e.target.value })}
              />
            </div>
            <div>
              <Label className='mb-1'>Location</Label>
              <Input
                value={updatedData.location}
                onChange={(e) => setUpdatedData({ ...updatedData, location: e.target.value })}
              />
            </div>
            <div className="sm:col-span-2">
              <Label className='mb-1'>Description</Label>
              <Input
                value={updatedData.description}
                onChange={(e) => setUpdatedData({ ...updatedData, description: e.target.value })}
              />
            </div>
            <div className="sm:col-span-2">
              <Label className='mb-1'>Website</Label>
              <Input
                value={updatedData.website}
                onChange={(e) => setUpdatedData({ ...updatedData, website: e.target.value })}
              />
            </div>
            <div className="sm:col-span-2">
              <Label className='mb-1'>Logo</Label>
              <Input
                type="file"
                onChange={(e) => setUpdatedData({ ...updatedData, logo: e.target.files[0] })}
              />
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-sky-900 hover:bg-sky-950"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Update"
              )}
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate("/admin/companies")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCompany;
