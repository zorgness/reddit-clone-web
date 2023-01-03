import React from "react";
import { NavBar } from "../components/NavBar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [{ data }] = usePostsQuery();

  return (
    <div>
      <NavBar />
      {!data ? (
        <div>...loading</div>
      ) : (
        data.posts.map((post) => {
          return (
            <div key={post._id}>
              <p>{post.title}</p>
            </div>
          );
        })
      )}
    </div>
  );
};

// server side rendering is important for pages with updates, for seo google,
// no need on static pages as login or register

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
