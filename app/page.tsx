import React from "react";
import ScrapeForm from "./Components/ScrapeForm";
import Navbar from "./Components/Navbar";
import { Sidebar } from "lucide-react";
const page = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <ScrapeForm />
    </div>
  );
};

export default page;
