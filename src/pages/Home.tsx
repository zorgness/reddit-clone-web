import { withUrqlClient } from "next-urql";
import React from "react";
import { Layout } from "../components/Layout/Layout";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [{ data }] = usePostsQuery();

  return (
    <Layout>
      {!data ? (
        <div>...loading</div>
      ) : (
        data.posts.map((post) => {
          return (
            <div key={post._id}>
              <p>{post.title}</p>
              <p>{post.text}</p>
            </div>
          );
        })
      )}
    </Layout>
  );
};

// server side rendering is important for pages with updates, for seo google,
// no need on static pages as login or register

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
