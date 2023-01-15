import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import React from "react";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface UpdootSectionProps {
  post: PostSnippetFragment;
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [, vote] = useVoteMutation();
  return (
    <Flex
      direction={"column"}
      align={"center"}
      justifyContent={"center"}
      mr={5}
    >
      <IconButton
        aria-label="upvote"
        onClick={() => {
          vote({
            value: 1,
            postId: post._id,
          });
        }}
        icon={<ChevronUpIcon w={8} h={8} color="teal" />}
      />
      {post.points}
      <IconButton
        aria-label="downvote"
        onClick={() => {
          vote({
            value: -1,
            postId: post._id,
          });
        }}
        icon={<ChevronDownIcon w={8} h={8} color="red.500" />}
      />
    </Flex>
  );
};
