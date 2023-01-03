import React from "react";
import { NavBar } from "../components/NavBar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface HomeProps {}

const Home: React.FC<HomeProps> = ({}) => {
  return (
    <div>
      <NavBar />
    </div>
  );
};

export default withUrqlClient(createUrqlClient)(Home);
