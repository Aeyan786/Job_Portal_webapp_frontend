import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import Navbar from "./Sharedcomponenets/Navbar";
import { Button } from "./ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_END_POINT, JOB_END_POINT } from "@/lib/Endpoint";
import { toast } from "sonner";
import { setSingleJob } from "@/Redux/jobSlice";

const JobDescription = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const params = useParams();
  const SingleJobId = params.id;
  const { singleJob } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const applied = singleJob?.applications?.some(
    (application) => application.applicant === user?._id
  );

  const [userApplied, setUserApplied] = useState(applied);

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const response = await axios.get(
          `${JOB_END_POINT}/getjobs/${SingleJobId}`,
          { withCredentials: true }
        );

        if (response.status !== 400) {
          const jobData = response.data.getSingleJob;

          dispatch(setSingleJob(jobData));

          setUserApplied(
            jobData?.applications?.some(
              (application) => application.applicant === user?._id
            ) || false
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (SingleJobId) {
      fetchSingleJob();
    }
  }, [SingleJobId, dispatch, user?._id]);

  const userHandle = () => {
    if (!user) {
      toast.warning("Log into your account");
      navigate("/login");
    }
  };

  const HandleApply = async () => {
    try {
      const response = await axios.get(
        `${APPLICATION_END_POINT}/apply/${SingleJobId}`,
        { withCredentials: true }
      );
      if (response.status == 200) {
        setUserApplied(true);

        const updateSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updateSingleJob));
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      if (error) {
        toast.warning("Login into your account");
        navigate("/login");
      }
    }
  };
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto mt-10 px-4">
        <div className="flex flex-col sm:flex-row justify-between gap-6">
          <div className="flex-1">
            <h1 className="text-2xl font-bold capitalize">
              {singleJob?.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <Badge variant="outline" className="text-sky-800">
                {`${singleJob?.position} Positions`}
              </Badge>
              <Badge variant="outline" className="text-red-800">
                {`${singleJob?.salary} PKR`}
              </Badge>
              <Badge variant="outline" className="text-green-800 capitalize">
                {singleJob?.jobType}
              </Badge>
            </div>
            <p className="text-sm my-5 text-muted-foreground">
              {singleJob?.description}
            </p>
          </div>

          <div className="flex-shrink-0 self-start sm:self-center">
            <Button
              disabled={userApplied && user}
              onClick={userApplied ? userHandle : HandleApply}
              className="w-full sm:w-auto bg-sky-900 hover:bg-sky-950"
            >
              {userApplied && user ? "Already Applied" : "Apply Now"}
            </Button>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="font-bold  border-b-2 border-gray-300 py-4">
          Company Details
        </h1>
        <h1 className="font-medium my-1">
          Name:{" "}
          <span className="pl-4 font-normal text-gray-800 capitalize">
            {singleJob?.company?.name}
          </span>
        </h1>
        <h1 className="font-medium my-1">
          Location:{" "}
          <span className="pl-4 font-normal text-gray-800 capitalize">
            {singleJob?.company?.location}
          </span>
        </h1>
        <h1 className="font-medium my-1">
          Description:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.company?.description || "N/A"}
          </span>
        </h1>
        <h1 className="font-medium my-1">
          Website:{" "}
          <a target="blank" href={singleJob?.company?.website} className="pl-4 hover:text-blue-600 underline font-normal text-gray-800">
            {singleJob?.company?.website || "N/A"}
          </a>
        </h1>
      </div>
      <div className="max-w-6xl mx-auto capitalize px-4">
        <h1 className="font-bold  border-b-2 border-gray-300 py-4">
          Job Details
        </h1>
        <h1 className="font-medium my-1">
          Requirements:
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.requirements.map((e) => e).join(" , ")}
          </span>
        </h1>
        <h1 className="font-medium my-1">
          Location:
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.location}
          </span>
        </h1>
        <h1 className="font-medium my-1">
          Total Applicants:
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.applications?.length || 0}
          </span>
        </h1>
        <h1 className="font-medium my-1">
          Salary:
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.salary} <em className="text-sm">(Per Month)</em>
          </span>
        </h1>
        <h1 className="font-medium my-1">
          Positions:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.position}
          </span>
        </h1>
        <h1 className="font-medium my-1">
          Posted Date:
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.createdAt.split("T")[0]}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default JobDescription;
