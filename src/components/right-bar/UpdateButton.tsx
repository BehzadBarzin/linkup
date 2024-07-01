"use client";

import { useFormStatus } from "react-dom";

const UpdateButton = () => {
  // ---------------------------------------------------------------------------
  // Get form state of the parent form
  const { pending } = useFormStatus();
  // ---------------------------------------------------------------------------
  return (
    <button
      className="bg-teal-500 p-2 mt-2 rounded-md text-white disabled:bg-opacity-50 disabled:cursor-not-allowed"
      disabled={pending}
    >
      {/* Display different values based on the form state */}
      {pending ? "Updating..." : "Update"}
    </button>
  );
};

export default UpdateButton;
