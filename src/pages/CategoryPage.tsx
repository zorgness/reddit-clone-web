import React, { useState } from "react";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Link, useParams } from "react-router-dom";
import { withUrqlClient } from "next-urql";
import { Layout } from "../components/Layout/Layout";
import { Stack, Flex, Heading, Button, Box, Text } from "@chakra-ui/react";
import { EditDeletePostButton } from "../components/EditDeletePostButton";
import { UpdootSection } from "../components/UpdootSection";
import { usePostsQuery } from "../generated/graphql";
import { capitalize } from "../utils/capitalize";

interface CategoryPageProps {}

const CategoryPage: React.FC<CategoryPageProps> = () => {
  const params = useParams();

  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  });
  const [{ data, fetching, error }] = usePostsQuery({
    variables,
  });

  const toDisplay = data?.posts.posts.filter(
    (el) => el.category.title === params.category
  );

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
      <Box my={4}>
        <Heading fontSize="xl">{capitalize(params.category as string)}</Heading>
        <Text color="gray">on mini reddit</Text>
      </Box>
      {!data ? (
        <div>...loading</div>
      ) : (
        <Stack spacing={8}>
          {toDisplay?.map(
            (
              { _id, title, textSnippet, creatorId, creator, category },
              index
            ) => {
              return (
                <Flex key={_id} p={5} shadow="md" borderWidth="1px">
                  <UpdootSection post={data!.posts.posts[index]} />
                  <Box flex={1}>
                    <Link to={`/post/${_id}`}>
                      <Heading fontSize="xl">{title}</Heading>
                    </Link>
                    <Text>category: {category.title}</Text>
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

export default withUrqlClient(createUrqlClient, { ssr: true })(CategoryPage);
