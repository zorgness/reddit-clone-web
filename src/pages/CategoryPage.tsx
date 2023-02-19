import { Box, Flex, Heading, Icon, Stack, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { EditDeletePostButton } from "../components/EditDeletePostButton";
import { Layout } from "../components/Layout/Layout";
import { UpdootSection } from "../components/UpdootSection";
import { usePostsByCategoryQuery } from "../generated/graphql";
import { capitalize } from "../utils/capitalize";
import { createUrqlClient } from "../utils/createUrqlClient";
import { FiMessageSquare } from "react-icons/fi";

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
                  <Flex flexDirection={"column"} align={"flex-start"}>
                    <UpdootSection post={data!.postsByCategory.posts[index]} />

                    <Flex
                      align="center"
                      justifyContent={"center"}
                      mt="2"
                      role="group"
                      color="grey"
                      cursor="pointer"
                      _hover={{
                        bg: "grey",
                        color: "white",
                      }}
                    >
                      {/* <Link to={`/post/${_id}`}>
                        <Icon
                          mr="1"
                          fontSize="16"
                          _groupHover={{
                            color: "white",
                          }}
                          as={FiMessageSquare}
                        />
                        <button> 76 Commentaries</button>
                      </Link> */}
                    </Flex>
                  </Flex>
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
