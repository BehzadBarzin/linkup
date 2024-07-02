import prisma from "@/utils/db";
import Image from "next/image";
import React, { FC } from "react";
import CommentList from "./CommentsList";

interface IProps {
  postId: number;
}

const Comments: FC<IProps> = async ({ postId }) => {
  // ---------------------------------------------------------------------------
  // Get comments from DB
  const comments = await prisma.comment.findMany({
    where: {
      postId,
    },
    include: {
      user: true,
    },
  });
  // ---------------------------------------------------------------------------
  return (
    <div className="">
      {/* WRITE */}
      <CommentList comments={comments} postId={postId} />
    </div>
  );
};

export default Comments;
