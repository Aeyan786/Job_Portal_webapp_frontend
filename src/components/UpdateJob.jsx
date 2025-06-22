import React, { useEffect } from "react";
import Navbar from "./Sharedcomponenets/Navbar";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { JOB_END_POINT } from "@/lib/Endpoint";
import { toast } from "sonner";
import { setAdminSingleJob } from "@/Redux/jobSlice";

const UpdateJob = () => {
  const [loading, setLoading] = useState(false);
  const { Companies } = useSelector((store) => store.company);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [updatedJob, setUpdatedJob] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    position: "",
  });

  useEffect(() => {
    const fetchAdminSingleJob = async () => {
      try {
        const response = await axios.get(`${JOB_END_POINT}/getjobs/${id}`, {
          withCredentials: true,
        });

        if (response.status == 201) {
          dispatch(setAdminSingleJob(response.data.getSingleJob));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAdminSingleJob();
  }, [dispatch, id]);

  const { adminSingleJob } = useSelector((store) => store.job);

  useEffect(() => {
    if (adminSingleJob) {

      setUpdatedJob({
        title: adminSingleJob?.title || "",
        description: adminSingleJob?.description || "",
        requirements: adminSingleJob?.requirements || "",
        salary: adminSingleJob?.salary || "",
        location: adminSingleJob?.location || "",
        jobType: adminSingleJob?.jobType || "",
        position: adminSingleJob?.position || "",
      });
    }
  }, [adminSingleJob]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `${JOB_END_POINT}/update/${id}`,
        updatedJob,
        {
          withCredentials: true,
        }
      );
      if (response.status == 201) {
        toast.success(response.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log(error);
      if (error) {
        toast.error(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Navbar />

      {!adminSingleJob ? (
        <p className="text-center text-lg mt-10">Loading Job Data...</p>
      ) : (
        <div className="max-w-3xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center sm:text-left">Update Job</h1>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mt-3">
                <Label className="text-md mb-1">Title</Label>
                <Input
                  type="text"
                  value={updatedJob.title}
                  onChange={(e) =>
                    setUpdatedJob({ ...updatedJob, title: e.target.value })
                  }
                />
              </div>
              <div className="mt-3">
                <Label className="text-md mb-1">Location</Label>
                <Input
                  value={updatedJob.location}
                  type="text"
                  onChange={(e) =>
                    setUpdatedJob({ ...updatedJob, location: e.target.value })
                  }
                />
              </div>
              <div>
                <Label className="text-md mb-1">Description</Label>
                <Input
                  type="text"
                  value={updatedJob.description}
                  onChange={(e) =>
                    setUpdatedJob({
                      ...updatedJob,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mt-2">
                <Label className="text-md mb-1">
                  Salary <em>(Per Month)</em>
                </Label>
                <Input
                  value={updatedJob.salary}
                  type="text"
                  onChange={(e) =>
                    setUpdatedJob({ ...updatedJob, salary: e.target.value })
                  }
                />
              </div>
              <div className="mt-2">
                <Label className="text-md mb-1">Position</Label>
                <Input
                  value={updatedJob.position}
                  type="number"
                  onChange={(e) =>
                    setUpdatedJob({ ...updatedJob, position: e.target.value })
                  }
                />
              </div>
              <div className="mt-2">
                <Label className="text-md mb-1">Requirements</Label>
                <Input
                  value={updatedJob.requirements}
                  type="text"
                  onChange={(e) =>
                    setUpdatedJob({
                      ...updatedJob,
                      requirements: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mb-8">
                <Label className="text-md mb-1">Job Type</Label>

                <Select
                  value={updatedJob.jobType}
                  onValueChange={(value) =>
                    setUpdatedJob({ ...updatedJob, jobType: value })
                  }
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
            </div>

            <div>
              <div>
                {loading ? (
                  <Button className="w-full bg-sky-900 hover:bg-sky-950 ">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin " />
                    please Wait
                  </Button>
                ) : (
                  <Button className="w-full bg-sky-900 hover:bg-sky-950 cursor-pointer">
                    Update
                  </Button>
                )}
              </div>
            </div>
          </form>
          <div>
            <Button
              onClick={() => {
                navigate("/admin/jobs");
              }}
              variant="outline"
              className="w-full my-2 cursor-pointer"
            >
              Cancel
            </Button>
            {Companies.length === 0 && (
              <p className="text-[12px] text-red-600 text-center">
                *Register a Company before posting a job
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateJob;
