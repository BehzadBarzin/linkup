"use client";

import { addStory } from "@/actions";
import { useUser } from "@clerk/nextjs";
import { Story, User } from "@prisma/client";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import Image from "next/image";
import { FC, useOptimistic, useState } from "react";
import StoryModal from "./StoryModal";

type StoryWithUser = Story & {
  user: User;
};

interface IProps {
  stories: StoryWithUser[];
  userId: string;
}

const StoryList: FC<IProps> = ({ stories, userId }) => {
  // ---------------------------------------------------------------------------
  // New story image state
  const [img, setImg] = useState<CloudinaryUploadWidgetInfo | undefined>();
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  // State that holds the currently showing story image
  const [showImg, setShowImg] = useState<string | undefined>();
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  // Get user state on client side
  const { user, isLoaded } = useUser();
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  // Actual list of all stories (comes from props)
  const [storyList, setStoryList] = useState(stories);
  // ---------------------------------------------------------------------------
  // Optimistically update list of all stories
  const [optimisticStories, addOptimisticStory] = useOptimistic(
    storyList,
    (state, value: StoryWithUser) => {
      return [value, ...state];
    }
  );
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  const add = async () => {
    if (!img?.secure_url) return;

    // Optimistically update the state
    // Setting temporary values for the new story that would be updated to actual values from DB once action is done
    addOptimisticStory({
      id: Math.random(),
      img: img.secure_url,
      createdAt: new Date(Date.now()),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      userId: userId,
      user: {
        id: userId,
        username: "Sending...", // Using this value instead of username to indicate pending state (optimistic state)
        avatar: user?.imageUrl || "/noAvatar.png",
        cover: "",
        description: "",
        name: "",
        surname: "",
        city: "",
        work: "",
        school: "",
        website: "",
        createdAt: new Date(Date.now()),
      },
    });

    try {
      // Call server action to create story
      const createdStory = await addStory(img.secure_url);
      // Update the actual state with the returned object from server action (actual story in the db)
      setStoryList((prev) => [createdStory!, ...prev]);

      // Clear image state
      setImg(undefined);
    } catch (err) {}
  };
  // ---------------------------------------------------------------------------
  return (
    <>
      {/* Upload Image Input */}
      <CldUploadWidget
        uploadPreset="linkup"
        onSuccess={(result, { widget }) => {
          setImg(result.info as CloudinaryUploadWidgetInfo);
          widget.close();
        }}
      >
        {({ open }) => {
          return (
            <div className="flex flex-col items-center gap-2 cursor-pointer relative">
              <Image
                src={img?.secure_url || user?.imageUrl || "/noAvatar.png"}
                alt=""
                width={80}
                height={80}
                className="w-20 h-20 rounded-full ring-2 object-cover"
                onClick={() => open()}
              />
              {img ? (
                <form action={add}>
                  <button className="text-xs bg-teal-500 hover:bg-teal-700 transition-all p-1 rounded-md text-white">
                    Send
                  </button>
                </form>
              ) : (
                <span className="font-medium">Add a Story</span>
              )}
            </div>
          );
        }}
      </CldUploadWidget>

      {/* List of stories (optimistic state) */}
      {optimisticStories.map((story) => (
        <div
          className="flex flex-col items-center gap-2 cursor-pointer"
          key={story.id}
          onClick={() => setShowImg(story.img)}
        >
          <Image
            src={story.user.avatar || "/noAvatar.png"}
            alt=""
            width={80}
            height={80}
            className="w-20 h-20 rounded-full ring-2"
          />
          <span className="font-medium">
            {story.user.name || story.user.username}
          </span>
        </div>
      ))}

      {/* Story Image Modal */}
      {showImg && (
        <StoryModal
          imageUrl={showImg}
          closeStory={() => setShowImg(undefined)}
        />
      )}
    </>
  );
};

export default StoryList;
