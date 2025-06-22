import React, { useState } from "react";
import Navbar from "./Sharedcomponenets/Navbar";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_END_POINT } from "@/lib/Endpoint";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setSingleCompany } from "@/Redux/companySlice";

const CompanyRegister = () => {
  const dispatch = useDispatch();
  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [companyData, setCompanyData] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    logo: "",
  });

  const handleRegister = async () => {
    const formData = new FormData();
    formData.append("name", companyData.name);
    formData.append("description", companyData.description);
    formData.append("website", companyData.website);
    formData.append("location", companyData.location);
    if (companyData.logo) formData.append("file", companyData.logo);

    try {
      setLoading(true);
      const response = await axios.post(
        `${COMPANY_END_POINT}/register`,
        formData,
        {
          headers: { "content-type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        dispatch(setSingleCompany(response.data?.registeredCompany));
        toast.success(response.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto my-10 px-4">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h1 className="text-2xl sm:text-3xl font-bold mb-1">
            Company Registration
          </h1>
          <p className="text-muted-foreground text-sm mb-6">
            You can change this information later.
          </p>

          <div className="space-y-4">
            <div>
              <Label className='mb-1'>Company Name</Label>
              <Input
                placeholder="Microsoft, Google etc."
                onChange={(e) =>
                  setCompanyData({ ...companyData, name: e.target.value })
                }
              />
            </div>
            <div>
              <Label className='mb-1'>Location</Label>
              <Input
                placeholder="Street 47/ NYC"
                onChange={(e) =>
                  setCompanyData({ ...companyData, location: e.target.value })
                }
              />
            </div>
            <div>
              <Label className='mb-1'>Description</Label>
              <Input
                placeholder="A Tech Innovative Company..."
                onChange={(e) =>
                  setCompanyData({
                    ...companyData,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label className='mb-1'>Website</Label>
              <Input
                placeholder="https://www.google.com"
                onChange={(e) =>
                  setCompanyData({ ...companyData, website: e.target.value })
                }
              />
            </div>
            <div>
              <Label className='mb-1'>Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setCompanyData({ ...companyData, logo: e.target.files[0] })
                }
              />
            </div>
          </div>

          <div className="mt-6 space-y-2">
            {loading ? (
              <Button className="w-full bg-sky-900 hover:bg-sky-950">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please Wait
              </Button>
            ) : (
              <Button
                onClick={handleRegister}
                className="w-full bg-sky-900 hover:bg-sky-950"
              >
                Register
              </Button>
            )}
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate("/admin/companies")}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyRegister;
