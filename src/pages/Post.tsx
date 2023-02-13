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
      <Heading m={4}>lol{data.post.categoryId}</Heading>
      <Box m={4}>{data.post.text}</Box>
      <EditDeletePostButton
        _id={data.post._id}
        creatorId={data.post.creatorId}
      />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
