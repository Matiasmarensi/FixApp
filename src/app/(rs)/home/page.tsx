import React from "react";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Home",
};
const Home = () => {
  redirect("/tickets");
};

export default Home;
