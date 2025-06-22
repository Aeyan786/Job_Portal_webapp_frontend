import { Search } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/Redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const browseHandler = () => {
    dispatch(setSearchQuery(query));
    navigate("/browse");
  };

  return (
    <div className="mx-auto text-center my-10 px-4">
      <span className="text-sm bg-gray-100 rounded-full py-1 px-4 text-blue-950 font-medium">
        World's No 1 Hiring Platform
      </span>
      <h1 className="text-3xl sm:text-4xl font-bold my-3 text-gray-900">
        Discover, Apply, & Land the Job <br />
        <span className="text-sky-950"> You've Always Wanted</span>
      </h1>
      <p className="text-sm sm:text-md text-gray-700 max-w-2xl mx-auto">
        Easily explore top opportunities, submit your application, and take the
        next step toward your dream career
      </p>
      <div className="flex flex-col sm:flex-row w-full sm:w-[90%] md:w-[70%] lg:w-[40%] my-5 shadow-lg border border-gray-200 rounded-full gap-2 mx-auto p-2 bg-white">
        <input
          type="text"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          placeholder="Find your dream job"
          className="flex-grow min-w-0 px-4 py-2 outline-none border-none rounded-full text-sm"
        />
        <Button
          onClick={browseHandler}
          className="rounded-full bg-sky-800 hover:bg-sky-950 px-4 py-2 mx-4  "
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
