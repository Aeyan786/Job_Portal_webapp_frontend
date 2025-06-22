import React from "react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const LatestJobCard = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/jobs/description/${job?._id}`)}
      className="p-4 sm:p-5 shadow-md hover:shadow-lg transition-all duration-300 rounded-xl bg-white border border-gray-100 cursor-pointer w-full"
    >
      <div className="mb-2">
        <h2 className="font-semibold text-lg capitalize text-sky-950">
          {job?.company?.name}
        </h2>
        <span className="text-gray-500 capitalize text-sm">
          {job?.company?.location}
        </span>
      </div>

      <div className="mb-3">
        <h1 className="font-bold text-xl capitalize text-gray-900 line-clamp-1">
          {job?.title}
        </h1>
        <p className="text-sm text-gray-600 line-clamp-2">
          {job?.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        <Badge variant="outline" className="text-sky-800 whitespace-nowrap">
          {`${job?.position} Position(s)`}
        </Badge>
        <Badge variant="outline" className="text-red-800 whitespace-nowrap">
          {`${job?.salary} PKR`}
        </Badge>
        <Badge variant="outline" className="text-green-800 capitalize whitespace-nowrap">
          {job?.jobType}
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCard;
