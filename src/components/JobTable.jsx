import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Edit2, MoreHorizontal, Trash2, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import getAllAdminJobs from "@/hooks/getAllAdminJobs";
import { JOB_END_POINT } from "@/lib/Endpoint";
import { setallAdminJobs } from "@/Redux/jobSlice";

const JobTable = () => {
  getAllAdminJobs();

  const { allAdminJobs, searchJobBytext } = useSelector((store) => store.job);
  const [filterJob, setFilterJob] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const filtered =
      allAdminJobs.length > 0
        ? allAdminJobs.filter((job) =>
            job?.title
              ?.toLowerCase()
              .includes(searchJobBytext?.toLowerCase() || "")
          )
        : [];
    setFilterJob(filtered);
  }, [allAdminJobs, searchJobBytext]);

  const handleDeleteJob = async (id) => {
    try {
      const response = await axios.delete(`${JOB_END_POINT}/delete/${id}`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        toast.success(response.data.message);
        dispatch(
          setallAdminJobs(allAdminJobs.filter((job) => job._id !== id))
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete job.");
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-[600px]">
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>

        {filterJob.length === 0 ? (
          <caption className="text-center my-10 text-muted-foreground">
            Looks like you haven't posted any jobs yet.
          </caption>
        ) : (
          <TableBody>
            {filterJob.map((job, i) => (
              <TableRow key={job._id || i}>
                <TableCell>{job?.company?.name}</TableCell>
                <TableCell className="capitalize">{job?.title}</TableCell>
                <TableCell>{job?.createdAt?.split("T")[0]}</TableCell>
                <TableCell className="text-center">
                  <Popover>
                    <PopoverTrigger className="cursor-pointer">
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-40">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <User2 className="w-4 h-4" />
                          <Button
                            onClick={() =>
                              navigate(`/admin/jobs/${job._id}/applicants`)
                            }
                            variant="ghost"
                            className="hover:bg-white p-0 h-auto"
                          >
                            Applicants
                          </Button>
                        </div>
                        <div className="flex items-center gap-2">
                          <Edit2 className="w-4 h-4" />
                          <Button
                            onClick={() =>
                              navigate(`/admin/jobs/${job._id}`)
                            }
                            variant="ghost"
                            className="hover:bg-white p-0 h-auto"
                          >
                            Edit
                          </Button>
                        </div>
                        <div className="flex items-center gap-2">
                          <Trash2 className="w-4 h-4" />
                          <Button
                            onClick={() => handleDeleteJob(job._id)}
                            variant="ghost"
                            className="hover:bg-white text-red-600 p-0 h-auto"
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default JobTable;
