import React, { useEffect } from "react";
import Navbar from "./Sharedcomponenets/Navbar";
import HeroSection from "./HeroSection";
import CategorySection from "./CategorySection";
import LatestJobs from "./LatestJobs";
import Footer from "./Sharedcomponenets/Footer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("admin/companies");
    }
  });

  return (
    <>
      <Navbar />
      <HeroSection />
      <CategorySection />
      <LatestJobs />
      <Footer />
    </>
  );
};

export default Home;
