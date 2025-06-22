import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const JobCards = ({ jobs }) => {
  const jobId = jobs?._id;

  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();

    const diffMs = now - date;

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  };

  const navigate = useNavigate();
  return (
    <div className="p-5 shadow-xl rounded-md bg-white border-gray-100">
      <span className="text-sm text-muted-foreground ">
        {timeAgo(jobs?.createdAt)}
      </span>

      <div className="flex justify-between mt-2">
        <div className="flex gap-3">
          <Avatar>
            <AvatarImage src={jobs?.company?.logo} />
          </Avatar>

          <div>
            <h4 className="font-medium capitalize">{jobs?.company?.name}</h4>
            <p className="font-medium text-sm text-muted-foreground capitalize">
              {jobs?.company?.location}
            </p>
          </div>
        </div>
        <div>
          <Button className="rounded-full" size="icon" variant="outline">
            <Bookmark />
          </Button>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-xl my-2 capitalize">{jobs?.title}</h1>
        <span className="text-sm text-gray-600">
          {jobs?.description}
        </span>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge variant="outline" className="text-sky-800">
          {`${jobs?.position} Position(s)`}
        </Badge>
        <Badge variant="outline" className="text-red-800">
          {`${jobs?.salary} PKR`}
        </Badge>
        <Badge variant="outline" className="text-green-800">
          {`${jobs?.jobType}`}
        </Badge>
      </div>
      <div className="flex mt-5 gap-3">
        <div>
          <Button
            onClick={() => {
              navigate(`/jobs/description/${jobId}`);
            }}
            variant="outline"
            className="cursor-pointer"
          >
            Details
          </Button>
        </div>
        <div>
          <Button variant="outline" className="cursor-pointer">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobCards;
