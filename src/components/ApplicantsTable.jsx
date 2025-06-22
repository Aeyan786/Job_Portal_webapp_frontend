import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Check, Circle, CircleX, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_END_POINT } from "@/lib/Endpoint";
import { toast } from "sonner";
import { Button } from "./ui/button";

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);
  const statusArray = ["Accepted", "Rejected"];
  const [applicantStatus, setApplicantStatus] = useState("");

  const handleStatus = async (status, id) => {
    try {
      setApplicantStatus(status);

      const response = await axios.post(
        `${APPLICATION_END_POINT}/status/${id}`,
        { status },
        { withCredentials: true }
      );
      if (response.status == 200) {
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      if (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fullname</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead >Actions</TableHead>
          </TableRow>
        </TableHeader>
        {applicants.applications.length === 0 ? (
          <caption className="text-center my-10 text-muted-foreground">
            No Applications found
          </caption>
        ) : (
          <TableBody>
            {applicants.applications.map((e, i) => {
              return (
                <TableRow key={i}>
                  <TableCell className="capitalize">
                    {e.applicant.fullname}
                  </TableCell>
                  <TableCell>{e.applicant.email}</TableCell>
                  <TableCell>{e.applicant.phoneNumber}</TableCell>
                  <TableCell>
                    <a
                      className="text-blue-600 hover:underline"
                      target="blanck"
                      href={e.applicant.profile.resume}
                    >
                      {e.applicant.profile.resumeOriginalName || "N/A"}
                    </a>
                  </TableCell>
                  <TableCell>{e?.createdAt?.split("T")[0]}</TableCell>
                  <TableCell className="text-center">
                    <Popover>
                      <PopoverTrigger className="cursor-pointer flex gap-5">
                        <MoreHorizontal />
                        {applicantStatus == "Accepted" ? (
                          <Check size={20} color="green" />
                        ) : (
                          <CircleX  size={20} color="red"/>
                        )}
                      </PopoverTrigger>
                      <PopoverContent className="w-32">
                        {statusArray.map((status, i) => {
                          return (
                            <div
                              key={i}
                              className="flex w-fit items-center my-2 cursor-pointer"
                            >
                              <Button
                                onClick={() => {
                                  handleStatus(status, e?._id);
                                }}
                                className="cursor-pointer"
                                variant="ghost"
                              >
                                {status}
                              </Button>
                            </div>
                          );
                        })}
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default ApplicantsTable;
