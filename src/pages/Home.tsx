import React from "react";
import { NavBar } from "../components/NavBar";

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
  return (
    <div>
      <NavBar />
    </div>
  );
};
