import React from "react";
import Post from "./Post";
import Card from "../Card";

const Feed = () => {
  return (
    <Card className="flex flex-col gap-12">
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </Card>
  );
};

export default Feed;
