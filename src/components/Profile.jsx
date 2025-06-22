import React, { useState } from "react";
import Navbar from "./Sharedcomponenets/Navbar";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Edit, Mail, Pen, Phone } from "lucide-react";
import { Badge } from "./ui/badge";
import AppliedJobs from "./AppliedJobs";
import { useSelector } from "react-redux";
import UpdateProfilePopup from "./UpdateProfilePopup";
import getAllAppliedJobs from "@/hooks/getAllAppliedJobs";

const Profile = () => {
  getAllAppliedJobs();
  const { user } = useSelector((store) => store.auth);

  const [open, setOpen] = useState(false);
  const resume = true;
  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto my-10 p-6 sm:p-8 bg-white border rounded-2xl border-gray-200">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-5">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={
                  user?.profile?.profilePhoto || "https://github.com/shadcn.png"
                }
              />
            </Avatar>

            <div className="text-center sm:text-left">
              <h4 className="font-medium text-xl capitalize">
                {user?.fullname}
              </h4>
              <p className="font-medium text-md text-muted-foreground">
                {user?.profile?.bio}
              </p>
            </div>
          </div>

          <div className="flex justify-center sm:justify-end">
            <Button
              onClick={() => setOpen(true)}
              className="cursor-pointer"
              variant="outline"
            >
              <Pen />
            </Button>
          </div>
        </div>

        <div className="my-6 space-y-2 text-sm sm:text-base">
          <div className="flex gap-3 items-center">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex gap-3 items-center">
            <Phone />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <h1 className="font-medium">Skills:</h1>
          {user?.profile?.skills.length !== 0 ? (
            user?.profile?.skills.map((e, i) => (
              <Badge
                key={i}
                className="border border-gray-300 shadow-sm"
                variant="outline"
              >
                {e}
              </Badge>
            ))
          ) : (
            <span className="text-sm">N/A</span>
          )}
        </div>

        <div className="flex gap-3 items-center mt-4">
          <h1 className="font-medium">Resume:</h1>
          {resume ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline break-all"
              href={user?.profile?.resume}
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span className="text-sm">N/A</span>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-0">
        <h1 className="font-bold text-md my-5">Applied Jobs</h1>
        <AppliedJobs />
      </div>

      <UpdateProfilePopup open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
