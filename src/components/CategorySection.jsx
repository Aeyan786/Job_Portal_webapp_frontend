import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchQuery } from "@/Redux/jobSlice";

const CategorySection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const browseHandler = (query) => {
    dispatch(setSearchQuery(query));
    navigate("/browse");
  };

  const Category = [
    { title: "Frontend Developer", shortDesc: "UI Design" },
    { title: "Backend Developer", shortDesc: "Server Logic" },
    { title: "Full Stack Developer", shortDesc: "Complete Web" },
    { title: "Graphic Designer", shortDesc: "Visual Design" },
    { title: "SEO Content Writer", shortDesc: "SEO Expert" },
    { title: "Digital Marketing", shortDesc: "Online Promotion" },
    { title: "Mern Stack Developer", shortDesc: "Fullstack JS" },
  ];

  return (
    <div className="text-center my-20 px-4 overflow-x-hidden">
      <h2 className="text-xl sm:text-2xl font-bold">Find your Category</h2>

      <Carousel className="w-full max-w-6xl mx-auto my-10">
        <CarouselContent>
          {Category.map((e, i) => (
            <CarouselItem
              key={i}
              className="w-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <Button
                onClick={() => browseHandler(e.title)}
                className="w-full py-6 px-4 h-auto text-center whitespace-normal"
                variant="outline"
              >
                <span className="block text-base font-semibold">
                  {e.title}
                  <span className="block text-sm font-normal text-gray-600 mt-1">
                    {e.shortDesc}
                  </span>
                </span>
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="cursor-pointer" />
        <CarouselNext className="cursor-pointer" />
      </Carousel>
    </div>
  );
};

export default CategorySection;
