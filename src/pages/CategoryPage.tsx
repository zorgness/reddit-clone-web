import React, { useState } from "react";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Link, useParams } from "react-router-dom";
import { withUrqlClient } from "next-urql";
import { Layout } from "../components/Layout/Layout";
import { Stack, Flex, Heading, Button, Box, Text } from "@chakra-ui/react";
import { EditDeletePostButton } from "../components/EditDeletePostButton";
import { UpdootSection } from "../components/UpdootSection";
import { usePostsByCategoryQuery, usePostsQuery } from "../generated/graphql";
import { capitalize } from "../utils/capitalize";

interface CategoryPageProps {}

const CategoryPage: React.FC<CategoryPageProps> = () => {
  const params = useParams();

  const [{ data, fetching, error }] = usePostsByCategoryQuery({
    variables: { categoryId: parseInt(params.id as string) },
  });

  if (!fetching && !data) {
    return (
      <div>
        <div>you got query failed for some reason</div>
        <div>{error?.message}</div>
      </div>
    );
  }

  // console.log(data?.postsByCategory);

  return (
    <Layout>
      <Box my={4} className="category-title">
        <Heading fontSize="xl">{capitalize(params.category as string)}</Heading>
        <Text color="gray">on mini reddit</Text>
      </Box>
      {!data && fetching ? (
        <div>...loading</div>
      ) : (
        <Stack spacing={8}>
          {data!.postsByCategory.posts.map(
            (
              { _id, title, textSnippet, creatorId, creator, category },
              index
            ) => {
              return (
                <Flex key={_id} p={5} shadow="md" borderWidth="1px">
                  <UpdootSection post={data!.postsByCategory.posts[index]} />
                  <Box flex={1}>
                    <Link to={`/post/${_id}`}>
                      <Heading fontSize="xl">{title}</Heading>
                    </Link>

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
      {/* {data && data.posts.hasMore ? (
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
      ) : null} */}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(CategoryPage);
