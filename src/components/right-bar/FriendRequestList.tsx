"use client";

import { acceptFollowRequest, declineFollowRequest } from "@/actions";
import { FollowRequest, User } from "@prisma/client";
import Image from "next/image";
import { FC, useOptimistic, useState } from "react";

type RequestWithUser = FollowRequest & {
  sender: User;
};

interface IProps {
  requests: RequestWithUser[];
}

const FriendRequestList: FC<IProps> = ({ requests }) => {
  // ---------------------------------------------------------------------------
  // Actual list of follow requests
  const [requestState, setRequestState] = useState<RequestWithUser[]>(requests);
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  // Optimistically updated list of requests
  const [optimisticRequests, removeOptimisticRequest] = useOptimistic(
    requestState, // State to optimistically update
    // Function to update the target state optimistically
    (state, reqId: number) => {
      // Remove the reqId from the requests list
      return state.filter((req) => req.id !== reqId);
    }
  );
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  // Accept request
  const accept = async (requestId: number, userId: string) => {
    // Update the list of requests optimistically (remove request)
    removeOptimisticRequest(requestId);

    try {
      // Call server action to accept user request
      await acceptFollowRequest(userId);
      // Update state
      setRequestState((prev) => prev.filter((req) => req.id !== requestId));
    } catch (err) {}
  };
  // ---------------------------------------------------------------------------
  // Decline request
  const decline = async (requestId: number, userId: string) => {
    // Update the list of requests optimistically (remove request)
    removeOptimisticRequest(requestId);

    try {
      // Call server action to decline user request
      await declineFollowRequest(userId);
      // Update state
      setRequestState((prev) => prev.filter((req) => req.id !== requestId));
    } catch (err) {}
  };
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  if (!requests.length || !requestState.length || !optimisticRequests.length) {
    return (
      <div className="italic text-center text-gray-500">
        No Friend Requests!
      </div>
    );
  }
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  return (
    <div className="">
      {/* Map over optimistic state of requests */}
      {optimisticRequests.map((request) => (
        <div className="flex items-center justify-between" key={request.id}>
          <div className="flex items-center gap-4">
            <Image
              src={request.sender.avatar || "/noAvatar.png"}
              alt=""
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-semibold">
              {request.sender.name && request.sender.surname
                ? request.sender.name + " " + request.sender.surname
                : request.sender.username}
            </span>
          </div>
          <div className="flex gap-3 justify-end">
            <form action={() => accept(request.id, request.sender.id)}>
              <button>
                <Image
                  src="/accept.png"
                  alt=""
                  width={20}
                  height={20}
                  className="cursor-pointer"
                />
              </button>
            </form>
            <form action={() => decline(request.id, request.sender.id)}>
              <button>
                <Image
                  src="/reject.png"
                  alt=""
                  width={20}
                  height={20}
                  className="cursor-pointer"
                />
              </button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendRequestList;
