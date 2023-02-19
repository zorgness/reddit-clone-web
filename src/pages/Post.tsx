import { withUrqlClient } from "next-urql";
import React from "react";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useParams } from "react-router-dom";
import { usePostQuery } from "../generated/graphql";
import { Layout } from "../components/Layout/Layout";
import { Box, Heading } from "@chakra-ui/react";
import { EditDeletePostButton } from "../components/EditDeletePostButton";

const Post = () => {
  const params = useParams();
  const intId = typeof params.id === "string" ? parseInt(params.id) : -1;

  const [{ data, error, fetching }] = usePostQuery({
    pause: intId === -1,
    variables: { _id: intId },
  });

  if (fetching) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>could not find post</Box>
      </Layout>
    );
  }
  return (
    <Layout>
      <Heading m={4}>{data.post.title}</Heading>
      <Box m={4}>{data.post.text}</Box>
      <Box m={4}>
        <EditDeletePostButton
          _id={data.post._id}
          creatorId={data.post.creatorId}
        />
      </Box>

      <Box id="commentaries-container" style={{ marginTop: "80vh" }}>
        Commentaries
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi, non?
          Natus, deserunt soluta fugiat, maxime, quo numquam nesciunt quod quae
          sapiente sit in iure ipsam magni amet modi obcaecati earum?
        </p>
      </Box>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
