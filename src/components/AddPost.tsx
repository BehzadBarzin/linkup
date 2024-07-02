"use client";

import Image from "next/image";
import React, { useState } from "react";
import Card from "./Card";
import { useUser } from "@clerk/nextjs";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import AddPostButton from "./AddPostButton";
import { addPost } from "@/actions";

const AddPost = () => {
  // ---------------------------------------------------------------------------
  // Get auth state on client side
  const { user, isLoaded } = useUser();
  // ---------------------------------------------------------------------------
  // Form input states
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState<CloudinaryUploadWidgetInfo | undefined>();
  // ---------------------------------------------------------------------------
  if (!isLoaded) {
    return "Loading...";
  }
  // ---------------------------------------------------------------------------
  const addNewPost = (formData: FormData) => {
    // Call server action to save post
    addPost(formData, img?.secure_url || "");
    setImg(undefined);
  };
  // ---------------------------------------------------------------------------
  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex gap-4 justify-between text-sm">
      {/* User Avatar */}
      <Image
        src={user?.imageUrl || "/noAvatar.png"}
        alt=""
        width={48}
        height={48}
        className="w-12 h-12 object-cover rounded-full"
      />
      {/* Add Post */}
      <div className="flex-1">
        {/* Form */}
        <form action={addNewPost} className="flex gap-4">
          {/* Post Content */}
          <textarea
            placeholder="What's on your mind?"
            className="flex-1 bg-slate-100 rounded-lg p-2"
            name="desc"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <div className="">
            <Image
              src="/emoji.png"
              alt=""
              width={20}
              height={20}
              className="w-5 h-5 cursor-pointer self-end"
            />

            {/* Add Post Button */}
            <AddPostButton />
          </div>
        </form>
        {/* Post Options */}
        <div className="flex items-center gap-4 mt-4 text-gray-400 flex-wrap">
          {/* Image Upload */}
          <CldUploadWidget
            uploadPreset="linkup"
            onSuccess={(result, { widget }) => {
              setImg(result.info as CloudinaryUploadWidgetInfo);
              // widget.close();
            }}
          >
            {({ open }) => {
              return (
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => open()}
                >
                  <Image src="/addimage.png" alt="" width={20} height={20} />
                  Photo
                </div>
              );
            }}
          </CldUploadWidget>
          {/* Add Video */}
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/addVideo.png" alt="" width={20} height={20} />
            Video
          </div>
          {/* Add Poll */}
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/poll.png" alt="" width={20} height={20} />
            Poll
          </div>
          {/* Add Event */}
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/addevent.png" alt="" width={20} height={20} />
            Event
          </div>
          {/* Preview Uploaded Image */}
          {img && (
            <div className="relative w-full h-36">
              <Image
                src={img.secure_url}
                alt=""
                width={144}
                height={144}
                className="absolute z-10 w-36 h-36 cursor-pointer object-cover"
              />
              <div
                className="absolute z-20 w-36 h-36 backdrop-blur-xl flex items-center justify-center opacity-0 hover:opacity-100 transition-all text-white cursor-pointer"
                onClick={() => setImg(undefined)}
              >
                Remove
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddPost;
