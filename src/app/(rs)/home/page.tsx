import React from "react";
import { redirect } from "next/navigation";
import Loading from "@/app/loading";

export const metadata = {
  title: "Home",
};
const Home = () => {
  redirect("/tickets");
};

export default Home;
