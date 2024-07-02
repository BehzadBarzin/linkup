import prisma from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import StoryList from "./StoryList";

const Stories = async () => {
  // ---------------------------------------------------------------------------
  // Get currently authenticated user
  const { userId: currentUserId } = auth();

  if (!currentUserId) return null;
  // ---------------------------------------------------------------------------
  // Get stories from DB
  const stories = await prisma.story.findMany({
    where: {
      // Hasn't expired
      expiresAt: {
        gt: new Date(),
      },
      // AND: is from current user OR from a user which current user follows
      OR: [
        {
          user: {
            followers: {
              some: {
                followerId: currentUserId,
              },
            },
          },
        },
        {
          userId: currentUserId,
        },
      ],
    },
    include: {
      user: true,
    },
  });

  // ---------------------------------------------------------------------------
  return (
    <div className="p-4 bg-white rounded-lg shadow-md overflow-scroll text-xs scrollbar-hide">
      <div className="flex gap-8 w-max">
        {/* Stories List */}
        <StoryList stories={stories} userId={currentUserId} />
      </div>
    </div>
  );
};

export default Stories;
