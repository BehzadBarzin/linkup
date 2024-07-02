"use client";

import { useFormStatus } from "react-dom";

const AddPostButton = () => {
  // ---------------------------------------------------------------------------
  // Get form status of the parent form
  const { pending } = useFormStatus();
  // ---------------------------------------------------------------------------
  return (
    <button
      className="bg-teal-500 hover:bg-teal-700 transition-all p-2 mt-2 rounded-md text-white disabled:bg-teal-300 disabled:cursor-not-allowed"
      disabled={pending}
    >
      {pending ? (
        <div className="flex items-center gap-2">
          {/* Spinner */}
          <div className="inline-block h-[10px] w-[10px] animate-spin rounded-full border-2 border-white-300 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          Sending
        </div>
      ) : (
        "Send"
      )}
    </button>
  );
};

export default AddPostButton;
