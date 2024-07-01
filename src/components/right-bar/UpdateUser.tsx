"use client";

import { User } from "@prisma/client";
import { FC, useActionState, useState } from "react";
import { updateProfile } from "@/actions";
import Image from "next/image";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import { useRouter } from "next/navigation";
import UpdateButton from "./UpdateButton";

interface IProps {
  user: User;
}

const UpdateUser: FC<IProps> = ({ user }) => {
  // ---------------------------------------------------------------------------
  // Is the form open?
  const [open, setOpen] = useState(false);
  // ---------------------------------------------------------------------------
  // Uploaded cover image
  const [cover, setCover] = useState<CloudinaryUploadWidgetInfo | undefined>();
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  // Form action state
  const [state, formAction] = useActionState(updateProfile, {
    success: false,
    error: false,
  });
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  const router = useRouter();
  // ---------------------------------------------------------------------------
  const handleClose = () => {
    setOpen(false);
    state.success && router.refresh();
  };
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  return (
    <div className="">
      {/* Open form button */}
      <span
        className="text-teal-500 text-xs cursor-pointer"
        onClick={() => setOpen(true)} // Open Form
      >
        Update
      </span>
      {/* Is the form open? */}
      {open && (
        <div className="absolute w-screen h-screen top-0 left-0 bg-black bg-opacity-65 flex items-center justify-center z-50 ">
          <form
            action={(formData) =>
              formAction({ formData, cover: cover?.secure_url || "" })
            }
            className="p-12 bg-white rounded-lg shadow-md flex flex-col gap-2 w-full md:w-1/2 xl:w-1/3 relative"
          >
            {/* Title */}
            <h1>Update Profile</h1>
            <div className="mt-4 text-xs text-gray-500">
              Use the navbar profile to change the avatar or username.
            </div>

            {/* Cover Picture upload widget */}
            <CldUploadWidget
              uploadPreset="linkup"
              onSuccess={(result) =>
                setCover(result.info as CloudinaryUploadWidgetInfo)
              }
            >
              {({ open }) => {
                return (
                  <div
                    className="flex flex-col gap-4 my-4"
                    onClick={() => open()} // Open Cloudinary Widget
                  >
                    <label htmlFor="">Cover Image</label>
                    <div className="flex items-center gap-2 cursor-pointer">
                      <Image
                        src={cover?.secure_url || user.cover || "/noCover.png"}
                        alt=""
                        width={48}
                        height={32}
                        className="w-12 h-8 rounded-md object-cover"
                      />
                      <span className="text-xs underline text-gray-600">
                        Change
                      </span>
                    </div>
                  </div>
                );
              }}
            </CldUploadWidget>

            {/* Form Inputs container */}
            <div className="flex flex-wrap justify-between gap-2 xl:gap-4">
              {/* First name input */}
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder={user.name || "John"}
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                  name="name"
                />
              </div>

              {/* Surname Input */}
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  Surname
                </label>
                <input
                  type="text"
                  placeholder={user.surname || "Doe"}
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                  name="surname"
                />
              </div>

              {/* Description Input */}
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  Description
                </label>
                <input
                  type="text"
                  placeholder={user.description || "Life is beautiful..."}
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                  name="description"
                />
              </div>

              {/* City Input */}
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  City
                </label>
                <input
                  type="text"
                  placeholder={user.city || "New York"}
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                  name="city"
                />
              </div>

              {/* School Input */}
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  School
                </label>
                <input
                  type="text"
                  placeholder={user.school || "MIT"}
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                  name="school"
                />
              </div>

              {/* Work Input */}
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  Work
                </label>
                <input
                  type="text"
                  placeholder={user.work || "Apple Inc."}
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                  name="work"
                />
              </div>

              {/* Website Input */}
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  Website
                </label>
                <input
                  type="text"
                  placeholder={user.website || "your.website"}
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                  name="website"
                />
              </div>
            </div>
            {/* Update button (uses form state to show dynamic text) */}
            <UpdateButton />

            {/* Messages displayed based on form action state */}
            {state.success && (
              <span className="text-green-500">Profile has been updated!</span>
            )}
            {state.error && (
              <span className="text-red-500">Something went wrong!</span>
            )}

            {/* Close form button */}
            <div
              className="absolute text-xl right-2 top-3 cursor-pointer"
              onClick={handleClose}
            >
              X
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
