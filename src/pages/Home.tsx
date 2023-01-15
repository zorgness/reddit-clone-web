import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { Layout } from "../components/Layout/Layout";
import { UpdootSection } from "../components/UpdootSection";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  });
  const [{ data, fetching, error }] = usePostsQuery({
    // variables: {
    //   limit: 15,
    //   cursor: null,
    // },
    variables,
  });

  if (!fetching && !data) {
    return (
      <div>
        <div>you got query failed for some reason</div>
        <div>{error?.message}</div>
      </div>
    );
  }

  return (
    <Layout>
      {!data ? (
        <div>...loading</div>
      ) : (
        <Stack spacing={8}>
          {data!.posts.posts.map(
            ({ _id, title, textSnippet, creator }, index) => {
              return (
                <Flex key={_id} p={5} shadow="md" borderWidth="1px">
                  <UpdootSection post={data!.posts.posts[index]} />
                  <Box>
                    <Heading fontSize="xl">{title}</Heading>
                    <Text>posted by {creator.username}</Text>
                    <Text mt={4}>{textSnippet}...</Text>
                  </Box>
                </Flex>
              );
            }
          )}
        </Stack>
      )}
      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              setVariables({
                limit: variables?.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              });
            }}
            isLoading={fetching}
            m="auto"
            my={8}
          >
            load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

// server side rendering is important for pages with updates, for seo google,
// no need on static pages as login or register

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
