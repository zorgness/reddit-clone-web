import React from "react";
import { Link } from "react-router-dom";
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
    <div>
      <Link to={`/post/edit/${_id}`}>
        <button aria-label="edit post">edit</button>
      </Link>
      <button
        aria-label="delete post"
        onClick={() => {
          deletePost({ _id });
        }}
      >
        delete
      </button>
    </div>
  );
};
