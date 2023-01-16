import { Box, Button } from "@chakra-ui/react";
import React from "react";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";

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

      <Button
        aria-label="Delete Post"
        onClick={() => {
          deletePost({ _id });
        }}
      >
        delete
      </Button>
    </Box>
  );
};
