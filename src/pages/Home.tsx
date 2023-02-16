import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { EditDeletePostButton } from "../components/EditDeletePostButton";
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
    variables,
  });

  // console.log(data?.posts);

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
      <Box my={4} className="category-title">
        <Heading fontSize="xl">Popular</Heading>
        <Text color="gray">on mini reddit</Text>
      </Box>
      {!data ? (
        <div>...loading</div>
      ) : (
        <Stack spacing={8}>
          {data!.posts.posts.map(
            (
              { _id, title, textSnippet, creatorId, creator, category },
              index
            ) => {
              return (
                <Flex key={_id} p={5} shadow="md" borderWidth="1px">
                  <UpdootSection post={data!.posts.posts[index]} />
                  <Box flex={1}>
                    <Flex align="baseline" justifyContent={"space-between"}>
                      <Link to={`/post/${_id}`}>
                        <Heading fontSize="xl">{title}</Heading>
                      </Link>
                      <Text color={"gray"}>{category.title}</Text>
                    </Flex>
                    <Text>posted by {creator.username}</Text>
                    <Flex align="center">
                      <Text flex={1} mt={4}>
                        {textSnippet}...
                      </Text>
                      <Box ml="auto">
                        <EditDeletePostButton _id={_id} creatorId={creatorId} />
                      </Box>
                    </Flex>
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
