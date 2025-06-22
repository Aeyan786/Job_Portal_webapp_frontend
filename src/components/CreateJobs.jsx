import React, { useEffect, useState } from "react";
import Navbar from "./Sharedcomponenets/Navbar";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { JOB_END_POINT } from "@/lib/Endpoint";
import { toast } from "sonner";

const CreateJobs = () => {
  const navigate = useNavigate();
  const { Companies } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const [NewJob, setNewJob] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    position: "",
    companyId: "",
  });

  const handleCompanyId = (value) => {
    const selectedCompany = Companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setNewJob({ ...NewJob, companyId: selectedCompany._id });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`${JOB_END_POINT}/post`, NewJob, {
        withCredentials: true,
      });
      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto my-10 px-4">
        <h1 className="text-2xl font-bold mb-4">Create Job</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="mt-3">
              <Label className="mb-1">Title</Label>
              <Input
                type="text"
                placeholder="Frontend Developer"
                onChange={(e) => {
                  setNewJob({ ...NewJob, title: e.target.value });
                }}
              />
            </div>
            <div className="mt-3">
              <Label className="mb-1">Location</Label>
              <Input
                type="text"
                placeholder="Karachi, Pakistan"
                onChange={(e) => {
                  setNewJob({ ...NewJob, location: e.target.value });
                }}
              />
            </div>
            <div className="mt-3 sm:col-span-2">
              <Label className="mb-1">Description</Label>
              <Input
                type="text"
                placeholder="A Frontend Developer with great knowledge of JavaScript frameworks"
                onChange={(e) => {
                  setNewJob({ ...NewJob, description: e.target.value });
                }}
              />
            </div>
            <div className="mt-3">
              <Label className="mb-1">
                Salary <em>(Per Month)</em>
              </Label>
              <Input
                type="text"
                placeholder="45,000"
                onChange={(e) => {
                  setNewJob({ ...NewJob, salary: e.target.value });
                }}
              />
            </div>
            <div className="mt-3">
              <Label className="mb-1">Position</Label>
              <Input
                type="number"
                placeholder="10"
                onChange={(e) => {
                  setNewJob({ ...NewJob, position: e.target.value });
                }}
              />
            </div>
            <div className="mt-3 sm:col-span-2">
              <Label className="mb-1">Requirements</Label>
              <Input
                type="text"
                placeholder="Node.js, React.js"
                onChange={(e) => {
                  setNewJob({ ...NewJob, requirements: e.target.value });
                }}
              />
            </div>
            <div className="mt-3">
              <Label className="mb-1">Job Type</Label>
              <Select
                onValueChange={(value) => {
                  setNewJob({ ...NewJob, jobType: value });
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full Time">Full Time</SelectItem>
                  <SelectItem value="Part Time">Part Time</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mt-3">
              <Label className="mb-1">Company</Label>
              <Select onValueChange={handleCompanyId}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Company" />
                </SelectTrigger>
                <SelectContent>
                  {Companies.length > 0 &&
                    Companies.map((e, i) => (
                      <SelectItem key={i} value={e?.name?.toLowerCase()}>
                        {e.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-6">
            {loading ? (
              <Button className="w-full bg-sky-900 hover:bg-sky-950" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button className="w-full bg-sky-900 hover:bg-sky-950 cursor-pointer">
                Create
              </Button>
            )}
          </div>
        </form>

        <Button
          onClick={() => navigate("/admin/jobs")}
          variant="outline"
          className="w-full mt-2"
        >
          Cancel
        </Button>

        {Companies.length === 0 && (
          <p className="text-sm text-red-600 text-center mt-2">
            *Register a company before posting a job
          </p>
        )}
      </div>
    </div>
  );
};

export default CreateJobs;
