import Image from "next/image";
import React, { FC } from "react";

interface IProps {
  imageUrl: string;
  closeStory: () => void;
}

const StoryModal: FC<IProps> = ({ imageUrl, closeStory }) => {
  return (
    <div
      className="absolute top-0 left-0 z-50 bg-zinc-900/90 w-screen h-screen backdrop-blur-xl flex items-center justify-center"
      onClick={closeStory}
    >
      <Image src={imageUrl} width={500} height={750} alt="story" className="" />
    </div>
  );
};

export default StoryModal;
