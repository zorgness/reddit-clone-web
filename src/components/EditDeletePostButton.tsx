import { Box, IconButton } from "@chakra-ui/react";
import React from "react";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

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
      <Link to={`/post/edit/${_id}`}>
        <IconButton
          aria-label="edit post"
          colorScheme="blue"
          mr={4}
          icon={<EditIcon aria-label="Edit Post" />}
        />
      </Link>
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
