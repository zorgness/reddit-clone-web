import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import React from "react";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface UpdootSectionProps {
  post: PostSnippetFragment;
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [loadingState, setLoadingState] = React.useState<
    "upvote" | "downvote" | "not loading"
  >("not loading");
  const [, vote] = useVoteMutation();
  return (
    <Flex
      direction={"column"}
      align={"center"}
      justifyContent={"center"}
      mr={5}
    >
      <IconButton
        colorScheme={post.voteStatus === 1 ? "teal" : undefined}
        aria-label="upvote"
        onClick={async () => {
          await vote({
            value: 1,
            postId: post._id,
          });
          setLoadingState("not loading");
        }}
        isLoading={loadingState === "upvote"}
        icon={
          <ChevronUpIcon
            w={8}
            h={8}
            color={post.voteStatus === 1 ? undefined : "teal"}
          />
        }
      />
      {post.points}
      <IconButton
        colorScheme={post.voteStatus === -1 ? "red" : undefined}
        aria-label="downvote"
        onClick={async () => {
          await vote({
            value: -1,
            postId: post._id,
          });
          setLoadingState("not loading");
        }}
        isLoading={loadingState === "downvote"}
        icon={
          <ChevronDownIcon
            w={8}
            h={8}
            color={post.voteStatus === -1 ? undefined : "red.500"}
          />
        }
      />
    </Flex>
  );
};
