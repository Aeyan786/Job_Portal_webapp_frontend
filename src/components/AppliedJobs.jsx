import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

const AppliedJobs = () => {
  const { getAppliedJobs } = useSelector((store) => store.job);

  return (
    <div className="mb-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        {getAppliedJobs.length === 0 ? (
          <caption className="text-center my-10 text-muted-foreground">
            Looks like you haven't applied for any job yet.
          </caption>
        ) : (
          <TableBody>
            {getAppliedJobs.map((e, i) => {
              return (
                <TableRow key={i}>
                  <TableCell>
                    {e?.job?.applications[0]?.createdAt?.split("T")[0]}
                  </TableCell>
                  <TableCell className="capitalize">{e?.job?.title}</TableCell>
                  <TableCell className="capitalize">
                    {e?.job?.company?.name}
                  </TableCell>
                  <TableCell className="uppercase">
                    {e?.job?.applications[0] && (
                      <Badge
                        className={
                          e?.status == "accepted"
                            ? "bg-green-700 text-white p-1"
                            : "bg-white text-black p-1"
                        }
                        variant="outline"
                      >
                        {e?.job?.applications[0]?.status}
                      </Badge>
                    )}
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

export default AppliedJobs;
