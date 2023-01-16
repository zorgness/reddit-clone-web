import { Box, IconButton } from "@chakra-ui/react";
import React from "react";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";
import { DeleteIcon } from "@chakra-ui/icons";

interface EditDeletePostButtonsProps {
  _id: number;
  creatorId: number;
}

export const EditDeletePostButton: React.FC<EditDeletePostButtonsProps> = ({
  _id,
  creatorId,
}) => {
  const [{ data: meData }] = useMeQuery();
  const [, deletePost] = useDeletePostMutation();

  if (meData?.me?._id !== creatorId) {
    return null;
  }

  return (
    <Box>
      {/* <NextLink href="/post/edit/[id]" as={`/post/edit/${_id}`}> */}
      {/* <IconButton as={Link} mr={4} icon="edit" aria-label="Edit Post" /> */}
      {/* </NextLink> */}
      <IconButton
        aria-label="delete post"
        colorScheme="red"
        onClick={() => {
          deletePost({ _id });
        }}
        icon={<DeleteIcon aria-label="Delete Post" />}
      />
    </Box>
  );
};
